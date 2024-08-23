"use client";

import React, { createContext, ReactNode, useState } from "react";

const initialState = {};

const AuthContext = createContext(initialState);

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
