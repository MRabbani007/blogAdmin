"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FiKey } from "react-icons/fi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function SigninPage() {
  const [showPwd, setShowPwd] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <main className="flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="p-8 flex flex-col gap-4 bg-zinc-900 rounded-xl"
      >
        <h1 className="text-4xl font-light mx-auto ">Welcome Back!</h1>
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
        {/* Forgot password */}
        <span className="text-sm font-light ml-auto">Forgot password?</span>
        <button className="py-2 px-4 mx-auto bg-zinc-800 rounded-lg">
          Sign In
        </button>
        <div className="bg-zinc-800 relative w-full h-1">
          <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-zinc-900 text-zinc-700 px-2">
            OR
          </span>
        </div>
        <Link
          href="#"
          className="py-2 px-4 mx-auto bg-zinc-800 rounded-lg flex items-center gap-2"
        >
          <Image src={"/google.png"} width={38} height={40} alt="google" />
          Continue with Google
        </Link>
        <div>
          Don&apos;t have an account?
          <Link href={"/signup"} className="underline ml-2">
            Join us today
          </Link>
        </div>
      </form>
    </main>
  );
}
