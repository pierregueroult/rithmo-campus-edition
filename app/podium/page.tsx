import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import styles from "./page.module.scss";
import MusicTop from "@/components/MusicTop/MusicTop";

export default function Podium() {
  return (
    <Layout>
      <div className={styles.imageContainer}>
        <Image
          src="/images/logo-low-no-baseline.png"
          width={150}
          height={30}
          alt="Logo"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <h1 className={styles.title}>Les musiques les plus votées</h1>
      <section className={styles.container}>
        <aside className={styles.aside}>
          <ul className={styles.listEmoji}>
            {["emoji_u1f947.png", "emoji_u1f948.png", "emoji_u1f949.png"].map(
              (src: string, i: number) => (
                <li key={i} className={styles.emoji}>
                  <Image
                    src={`/emojis/${src}`}
                    width={40}
                    height={40}
                    alt="Emoji"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </li>
              )
            )}
          </ul>
          <p className={styles.text}>Bientôt sur le podium ...</p>
        </aside>
        <ul className={styles.list}>
          <MusicTop />
        </ul>
      </section>
    </Layout>
  );
}
