"use client";

import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FiKey } from "react-icons/fi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function SignUpPage() {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <main className="flex items-center justify-center">
      <form className="p-8 flex flex-col gap-4 bg-zinc-900 rounded-xl">
        <h1 className="text-4xl font-light mx-auto ">Join Us</h1>
        {/* username */}
        <div className="flex items-center gap-2 rounded-lg bg-zinc-800 p-2">
          <AiOutlineMail size={24} className="" />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="bg-transparent flex-1"
          />
        </div>
        {/* password */}
        <div className="flex items-center gap-2 rounded-lg bg-zinc-800 p-2">
          <FiKey size={24} className="" />
          <input
            type={showPwd ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            className="bg-transparent flex-1"
          />
          <button onClick={() => setShowPwd((curr) => !curr)}>
            {showPwd ? (
              <IoEyeOutline size={24} />
            ) : (
              <IoEyeOffOutline size={24} />
            )}
          </button>
        </div>
        <button className="py-2 px-4 mx-auto bg-zinc-800 rounded-lg">
          Sign Up
        </button>
        <div>
          Already have an account?
          <Link href={"/signin"} className="underline ml-2">
            Sign in
          </Link>
        </div>
      </form>
    </main>
  );
}
