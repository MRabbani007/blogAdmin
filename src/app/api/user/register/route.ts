import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user === null || !user.id) {
      throw new Error("Could not fetch user");
    }

    // const dbUser = await getDbUser(user?.id);
    const dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
    });

    if (!dbUser) {
      // const doc: User = {
      //   id: user?.id ?? "",
      //   email: user?.email ?? "",
      //   username: user?.username ?? "",

      //   firstName: user?.given_name ?? "",
      //   lastName: user?.family_name ?? "",
      //   profilePic:
      //     user?.picture ?? `https://avatar.vercel.sh/${user?.given_name}`,
      // };
      // await createDBUser(doc);
      await prisma.user.create({
        data: {
          kindeId: user.id,
          username: user.username ?? "",
          firstName: user?.given_name,
          lastName: user?.family_name,
          email: user?.email,
        },
      });
    }

    return NextResponse.redirect(
      process.env?.KINDE_SITE_URL ?? "" + "/admin/blogs"
    );
  } catch (error) {
    console.log("Error updating db user");
    console.log(error);

    return NextResponse.redirect(
      process.env?.KINDE_SITE_URL ?? "" + "/api/auth/login"
    );
  }
}
