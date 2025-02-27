import Link from "next/link";
import React from "react";
import { FaBell, FaUser } from "react-icons/fa6";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import { RiAdminLine } from "react-icons/ri";
import {
  IoCreateOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { GiFeather } from "react-icons/gi";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();

  const session = await getUser();

  return (
    <nav className="w-full flex items-center justify-between gap-4 py-2 px-4 bg-sky-950/40 dark:bg-sky-950">
      {/* Left Logo */}
      <div>
        <Link href="/" className="flex items-center gap-2">
          {/* <Image
            src="/logo.png"
            width={512}
            height={512}
            alt="Logo"
            className="size-8"
          /> */}
          <GiFeather size={30} />
          <span className="font-bold text-2xl">Blog</span>
        </Link>
      </div>
      {/* Right User */}
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <button className="">
              <FaBell size={20} />
            </button>
            <UserDropDown />
          </>
        ) : (
          <>
            <LoginLink>Sign in</LoginLink>
            <RegisterLink>
              {/* <button className="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg duration-200">
                Sign up
              </button> */}
              <Button>Sign Up</Button>
            </RegisterLink>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}

// { showDropDown }: { showDropDown: boolean }

function UserDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUser size={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/admin/create">
            <IoCreateOutline size={26} className="mr-2" />
            Create
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/admin">
            <RiAdminLine size={26} className="mr-2" />
            Admin
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <IoSettingsOutline size={26} className="mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <LogoutLink>
            <IoLogOutOutline size={26} className="mr-2" />
            Sign Out
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
