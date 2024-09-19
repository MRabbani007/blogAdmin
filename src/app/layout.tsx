import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AuthProvider from "@/context/AuthProvider";
import { CATEGORIES, TAGS } from "@/lib/data";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

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
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="flex items-stretch gap-4">
              {children}
              <div className="hidden py-0 px-4">
                <div>
                  <p className="font-bold text-xl my-4">Topics</p>
                  <ul className="flex items-center gap-2 text-sm flex-wrap max-w-[300px]">
                    {CATEGORIES.map((cat, idx) => (
                      <li key={idx} className="bg-zinc-800 py-2 px-4">
                        {cat.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-xl my-4">Tags</p>
                  <ul className="flex items-center gap-2 text-sm flex-wrap max-w-[300px]">
                    {TAGS.map((cat, idx) => (
                      <li key={idx} className="bg-zinc-800 py-2 px-4">
                        {cat.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
