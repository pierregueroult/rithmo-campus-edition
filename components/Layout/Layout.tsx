"use client";
import { motion } from "framer-motion";
import styles from "./Layout.module.scss";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const animationPattern = {
  hide: {
    opacity: 0,
    x: 0,
    y: 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  out: {
    opacity: 0,
    x: 0,
    y: 0,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  useEffect(() => {
    if (
      !path.startsWith("/session") &&
      Boolean(localStorage.getItem("session")) === false
    ) {
      redirect("/session");
    }
  });

  return (
    <motion.main
      initial="hide"
      animate="show"
      exit="out"
      variants={animationPattern}
      transition={{ type: "linear" }}
      className={styles.main}
    >
      {children}
    </motion.main>
  );
}
