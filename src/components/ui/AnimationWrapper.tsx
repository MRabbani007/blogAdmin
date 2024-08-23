"use client";

import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: ReactNode;
}

export default function AnimationWrapper({ children }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={""}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
