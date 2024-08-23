import Link from "next/link";
import React from "react";
import { FaBell, FaUser } from "react-icons/fa6";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between gap-4 p-4">
      <div>
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={512}
            height={512}
            alt="Logo"
            className="w-10"
          />
          <span className="font-extrabold text-3xl ">Blog</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {/* <LoginLink postLoginRedirectURL="/admin">Sign in</LoginLink>
        <RegisterLink postLoginRedirectURL="/">Sign up</RegisterLink> */}
        <Link href="/admin">Admin</Link>
        <button className="text-yellow-500">
          <FaBell size={30} />
        </button>
        <Link href={"/signin"} className="">
          <FaUser size={30} />
        </Link>
      </div>
    </div>
  );
}
