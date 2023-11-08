import styles from "./page.module.scss";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import HomeMusicDisplay from "@/components/HomeMusicDisplay/HomeMusicDisplay";

export default function Home(): JSX.Element {
  return (
    <Layout>
      <div className={styles.imageContainer}>
        <Image
          src="/images/logo-low.png"
          width={600}
          height={90}
          alt="Logo de l'application Rithm'o"
          quality={100}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <p className={styles.intro}>
        Bienvenue sur Rithm&apos;o, tu peux voter pour une musique toutes les{" "}
        <span>3 minutes</span>, rend toi sur la page de votes !
      </p>
      <HomeMusicDisplay title="Les plus votés" apiPath="/api/mostvoted" />
      <HomeMusicDisplay title="Les plus hots" apiPath="/api/hot" />
      <HomeMusicDisplay title="Les plus récents" apiPath="/api/recent" />
    </Layout>
  );
}
