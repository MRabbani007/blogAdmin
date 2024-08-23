import { MongoClient } from "mongodb";

const uri = process.env?.MONGODB_URI;

if (!uri) {
  throw new Error("Missing db uri");
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env?.NOVE_ENV === "development") {
  // in development mode, use a global variable so that the value is preserved accross module reloads caused by HMR (Hot Module Replacement)

  let globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongoClientPromise._mongoClientPromise;

  // if (!global?._mongoClientPromise) {
  //   client = new MongoClient(url, options);
  //   global._mongoClientPromise = client.connect();
  // }

  // clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module scoped MongoClient Promise

export default clientPromise;
