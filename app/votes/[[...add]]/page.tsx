import Layout from "@/components/Layout/Layout";
import styles from "./page.module.scss";
import Image from "next/image";
import MusicSearch from "@/components/MusicSearch/MusicSearch";
import VotesHistory from "@/components/VotesHistory/VotesHistory";
import { redirect } from "next/navigation";
import { ReactElement } from "react";

type VotesProps = {
  params: {
    add: string[] | null;
  };
};

export default function Votes({ params: { add } }: VotesProps): ReactElement {
  if (add && add.length > 1) {
    redirect("/votes");
  }
  return (
    <Layout>
      <div className={styles.imageContainer}>
        <Image
          src="/images/logo-low-no-baseline.png"
          alt="Logo de rithmo"
          width="150"
          height="30"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <MusicSearch />
      <VotesHistory add={add && add.length ? add[0] : ""} />
    </Layout>
  );
}
