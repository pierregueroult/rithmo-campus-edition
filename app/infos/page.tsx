import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import styles from "./page.module.scss";
import ResetButton from "@/components/ResetButton/ResetButton";
import Link from "next/link";

export default function Infos() {
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
      <ul className={styles.list}>
        <li className={styles.version}>
          <p>Version 0.9.0</p>
          <p>
            <a href="mailto:contact@pierregueroult.dev">
              © 2023 Pierre Gueroult
            </a>
          </p>
        </li>
        <li className={styles.legal}>
          <h2>Politique des Données</h2>
          <p>
            Nous utilisons seulement le stockage local de votre navigateur pour
            sauvegarder vos données. Nous ne collectons aucune donnée
            personnelle. Nous ne partageons aucune donnée avec des tiers ! ⚡
          </p>
        </li>
        <li className={styles.buttons}>
          <Link href={"/admin"}>Page Admin</Link>
          <a
            href="https://paypal.me/pierregueroult"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy a coffee ☕️
          </a>
          <ResetButton />
          <Link href={"/infos/credits"}>Plus d&apos;infos 🆙</Link>
        </li>
      </ul>
    </Layout>
  );
}
