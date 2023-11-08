import "./globals.scss";
import type { Metadata } from "next";
import { Cormorant_Garamond, Abril_Fatface } from "next/font/google";

import Animated from "@/components/Animated/Animated";
import Navigation from "@/components/Navigation/Navigation";
import MusicInfo from "@/components/MusicInfo/MusicInfo";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import React, { ReactElement } from "react";

const garamond: NextFontWithVariable = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--garamond",
});
const abril: NextFontWithVariable = Abril_Fatface({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--abril",
});

export const metadata: Metadata = {
  title: "Rithm'o Campus Edition - Application de Musique",
  description:
    "Projet du BDE Labete, Rithm'o est une application de musique pour les étudiants de l'IUT de Rouen. Elle permet de créer des playlists collectives pour les soirées étudiantes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <html lang="fr" dir="ltr">
      <body className={`${abril.variable} ${garamond.variable}`}>
        <Animated>{children}</Animated>
        <Navigation />
        <MusicInfo />
      </body>
    </html>
  );
}
