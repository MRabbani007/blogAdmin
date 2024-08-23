import { initializeApp } from "firebase/app";
import {
  deleteObject,
  getBytes,
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { MetaData } from "../../types";

const firebaseConfig = {
  apiKey: "AIzaSyD_tToQ_1sWj3zBc52yRTtjz9aW_7ss1Hw",
  authDomain: "myblog-51c80.firebaseapp.com",
  projectId: "myblog-51c80",
  storageBucket: "myblog-51c80.appspot.com",
  messagingSenderId: "927017388934",
  appId: "1:927017388934:web:4f4e27227a29fd55b33a07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const firestore = getFirestore(app);

export async function uploadFile(
  file: Blob | Uint8Array | ArrayBuffer,
  folder: String,
  filename: string
) {
  try {
    const fileRef = ref(storage, `${folder}${filename}`);

    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return { status: "", downloadURL };
  } catch (error) {
    return { status: "error" };
  }
}

export async function getFiles(pathname: string = "/") {
  try {
    const storageRef = ref(storage, pathname);

    const folders = [];
    const files = [];

    // Find all the prefixes and items.
    listAll(storageRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          folders.push({ name: folderRef.name, pathname: folderRef.fullPath });
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          files.push({ name: itemRef.name, pathname: itemRef.fullPath });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  } catch (error) {}
}

export async function deleteFile(pathname: string | null) {
  try {
    if (!pathname) return;

    let status = { isLoading: true, isSuccess: false, isError: false };

    const fileRef = ref(storage, pathname);
    // Delete the file
    deleteObject(fileRef)
      .then(() => {
        // File deleted successfully
        status = { isLoading: false, isSuccess: true, isError: false };
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        status = { isLoading: false, isSuccess: false, isError: true };
      });

    return status;
  } catch (error) {}
}

export async function createDoc(table: string, document: MetaData) {
  try {
    const col = collection(firestore, table);
    const createdAt = Timestamp.fromDate(new Date());
    const updatedAt = "";

    const docRef = await addDoc(col, { ...document, createdAt, updatedAt });

    return { status: "success", message: "" };
  } catch (error) {
    throw new Error("Failed to create document");
  }
}

export async function updateDocument(document: MetaData) {
  try {
    if (!document._id) return;

    const docRef = doc(firestore, "blogs", document._id);

    const { title, slug, detail, category, status, tags, downloadURL, banner } =
      document;
    await updateDoc(docRef, {
      title,
      slug,
      detail,
      category,
      status,
      tags,
      banner,
      downloadURL,
      updatedAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteDocument(id: string) {
  try {
    const q = query(collection(firestore, "blogs"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (item) => {
      await deleteDoc(item.ref);
    });
  } catch (error) {}
}

export async function getBlogs() {
  try {
    const querySnapshot = await getDocs(collection(firestore, "blogs"));
    const blogs: MetaData[] = [];
    querySnapshot.forEach((doc) => {
      blogs.push({ ...doc.data(), _id: doc.id } as MetaData);
    });
    return blogs;
  } catch (error) {
    return [];
  }
}

export async function getBlogByName(slug: string) {
  try {
    const q = query(collection(firestore, "blogs"), where("slug", "==", slug));
    let data: MetaData[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ ...(doc.data() as MetaData), _id: doc.id });
    });

    const storageRef = ref(storage, `/blogs/${data[0].id}.mdx`);

    // const url = await getDownloadURL(storageRef)
    const file = await getBytes(storageRef);
    const meta = await getMetadata(storageRef);

    // const t = new Blob([data]);
    var enc = new TextDecoder("utf-8");
    const content = enc.decode(file);

    return { data: data[0], rawMDX: content };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getBlogByID(id: string) {
  const q = query(collection(firestore, "blogs"), where("id", "==", id));

  let data: MetaData[] = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...(doc.data() as MetaData), _id: doc.id });
  });

  return data[0] ?? null;
}