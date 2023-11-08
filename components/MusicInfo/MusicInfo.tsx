"use client";
import { useEffect, useState } from "react";
import styles from "./MusicInfo.module.scss";
import { Music } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MusicInfo() {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [mostVotedMusic, setMostVotedMusic] = useState<Music>();

  useEffect(() => {
    function listener() {
      setIsMusicOn(Boolean(localStorage.getItem("session")));
    }
    const interval = setInterval(listener, 1000);

    async function fetchMostVotedMusic() {
      if (!isMusicOn && !Boolean(localStorage.getItem("session"))) return;
      const response = await fetch(
        `/api/mostvoted?session=${localStorage.getItem("session")}&number=1`
      );
      const mostVotedMusic = await response.json();
      setMostVotedMusic(mostVotedMusic[0]);
    }
    const interval2 = setInterval(fetchMostVotedMusic, 10000);

    fetchMostVotedMusic();

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside className={`${styles.container} ${isMusicOn && styles.showing}`}>
      {mostVotedMusic && (mostVotedMusic as Music) && (
        <div className={styles.innerContainer}>
          <div className={styles.description}>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className={styles.imageContainer}
            >
              <Image
                src={mostVotedMusic.imageCover}
                alt={mostVotedMusic.title}
                width={50}
                height={50}
              />
            </motion.div>
            <span className={styles.text}>
              <h3>
                {mostVotedMusic.title.substring(0, 18) +
                  (mostVotedMusic.title.length > 18 ? "..." : "")}
              </h3>
              <p>
                <span>TOP VOTE : </span>

                {mostVotedMusic.artist.substring(0, 18) +
                  (mostVotedMusic.artist.length > 18 ? "..." : "")}
              </p>
            </span>
          </div>
          <Link
            className={styles.vote}
            href={`/music/${mostVotedMusic.spotifyId}`}
          >
            <span>{mostVotedMusic.count}</span>

            <Image
              src={`/emojis/${mostVotedMusic.emoji}`}
              width={30}
              height={30}
              alt={mostVotedMusic.emoji}
            />
          </Link>
        </div>
      )}
    </aside>
  );
}
