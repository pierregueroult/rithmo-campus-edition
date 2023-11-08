import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import styles from "./page.module.scss";

export default function Credits(): JSX.Element {
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
      <div className={styles.textContainer}>
        <p>
          Projet propulsé par{" "}
          <a
            href="https://instagram.com/bde_labete"
            target="_blank"
            rel="noreferrer noopener"
          >
            le BDE La Bête 🐺
          </a>
          , designé et développé par{" "}
          <a
            href="https://pierregueroult.dev"
            target="_blank"
            rel="noreferrer noopener"
          >
            Pierre Gueroult
          </a>{" "}
          !
        </p>
        <h4>L&apos;idée </h4>
        <p>
          Rithm&apos;o, campus edition est un site crée pour le Bureau Des
          Étudiants de l&apos;IUT de Rouen (Antenne d&apos;elbeuf). Étant membre
          de cette association, j&apos;ai eu l&apos;idée de développer une
          application qui pourrait nous être utile quand on organise une soirée.
          En effet, on ne sait jamais qu&apos;elle musique mettre, et on ne
          dispose pas à chaque fois d&apos;un DJ pro. Ainsi, cette application
          serait une web application pour chaque membre d&apos;une soirée puisse
          ajouter des musiques et que celle-ci soit notifié au DJ (amateur ou
          pro) qui gère l&apos;évènement. <br /> Pierre Guéroult
        </p>
        <h4>La réalisation</h4>
        <p>
          Rithm&apos;o Campus edition est une application web basé sur le
          framework{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer noopener"
          >
            Next.js
          </a>{" "}
          et le langage{" "}
          <a
            href="https://www.typescriptlang.org"
            target="_blank"
            rel="noreferrer noopener"
          >
            TypeScript
          </a>
          , il est stylisé avec{" "}
          <a
            href="https://sass-lang.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Sass
          </a>{" "}
          et{" "}
          <a
            href="https://css-modules.github.io"
            target="_blank"
            rel="noreferrer noopener"
          >
            CSS Modules
          </a>
          . Hebergé sur{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Vercel
          </a>{" "}
          avec une base de donnée MongoDB hébergé sur{" "}
          <a
            href="https://www.mongodb.com/cloud/atlas"
            target="_blank"
            rel="noreferrer noopener"
          >
            MongoDB Atlas
          </a>
          .
        </p>
      </div>
    </Layout>
  );
}
