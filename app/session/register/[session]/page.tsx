"use client";

import Layout from "@/components/Layout/Layout";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import styles from "./page.module.scss";

type RegisterSessionProps = {
  params: {
    session: string;
  };
};

export default function RegisterSession({
  params,
}: RegisterSessionProps): JSX.Element {
  useEffect(() => {
    localStorage.setItem("session", params.session);
    redirect("/");
  }, [params.session]);

  return (
    <Layout>
      <h2 className={styles.title}>Session ...</h2>
      <p className={styles.description}>Enregistrement sur la session ...</p>
    </Layout>
  );
}
