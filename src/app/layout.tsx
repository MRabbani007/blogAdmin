import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Topics from "@/components/Topics";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AuthProvider from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Admin",
  description: "Administrator for blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { getUser, isAuthenticated } = getKindeServerSession();

  // const user = await getUser();
  // const isUserAuthenticated = await isAuthenticated();

  // const isAdmin = user?.email === process.env?.ADMIN_EMAIL;

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
