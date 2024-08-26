import { createDBUser, createDoc, getDbUser } from "@/lib/firebase";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from "../../../../../types";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Could not fetch user");
  }

  const dbUser = await getDbUser(user?.id);

  if (!dbUser) {
    const doc: User = {
      id: user?.id ?? "",
      email: user?.email ?? "",
      username: user?.username ?? "",

      firstName: user?.given_name ?? "",
      lastName: user?.family_name ?? "",
      profilePic:
        user?.picture ?? `https://avatar.vercel.sh/${user?.given_name}`,
    };
    await createDBUser(doc);
  }

  return NextResponse.redirect("http://localhost:3000/admin");
}
