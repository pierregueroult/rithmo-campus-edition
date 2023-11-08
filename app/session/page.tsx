import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import styles from "./page.module.scss";
import getAllSessions from "@/contents/getAllSessions";

export default async function Session() {
  const sessions = await getAllSessions();

  return (
    <Layout>
      <div className={styles.imageContainer}>
        <Image
          src="/images/logo-low.png"
          width={250}
          height={80}
          alt="Logo de l'application Rithm'o"
          quality={100}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <section>
        <h1 className={styles.title}>Veuillez choisir une session :</h1>
        <ul className={styles.sessionList}>
          {sessions.map((session) => (
            <li key={session.id} className={styles.session}>
              <a href={`/session/register/${session.id}`}>
                <h3>{session.title}</h3>
                <p>
                  {session.createdAt.toLocaleDateString("fr-FR", {
                    month: "numeric",
                    day: "numeric",
                  })}
                </p>
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.legal}>
          En m&apos;enregistrant sur une session, j&apos;accepte que mes données
          soient utilisées pour le fonctionnement de l&apos;application, et
          stockée à la fois dans le navigateur et sur le serveur. Je peux à tout
          moment supprimer mes donnéees dans la section
          &quot;Informations&quot;.
        </p>
      </section>
    </Layout>
  );
}
