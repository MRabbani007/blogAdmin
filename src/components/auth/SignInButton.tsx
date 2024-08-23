"use server";

import React from "react";
import { signIn } from "@/auth";

export default async function SignInButton() {
  return (
    <form
      onSubmit={async () => {
        await signIn("google");
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
