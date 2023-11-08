"use client";

import { useState, useEffect } from "react";
import styles from "./MusicEmojis.module.scss";
import Image from "next/image";
import { get } from "http";

type MusicEmojisProps = {
  musicExist: {
    exists: boolean;
    count: number;
  } | null;
  activeEmoji: string | null;
  setActiveEmoji: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function MusicEmojis({
  musicExist,
  activeEmoji,
  setActiveEmoji,
}: MusicEmojisProps): JSX.Element {
  const [emojis, setEmojis] = useState<string[]>([]);

  async function get_emojis() {
    const res = await fetch(`/api/emojis`);
    const data = await res.json();
    setEmojis(data);
  }

  useEffect(() => {
    if (musicExist?.exists === false) {
      get_emojis();
    }
  }, [musicExist]);

  if (!musicExist) return <></>;

  if (musicExist?.exists === true)
    return (
      <div>
        <p className={`${styles.voteTexte} ${styles.margins}`}>
          Cette musique a été votée{" "}
          <span className={styles.votes}>{musicExist?.count}</span> fois
        </p>
      </div>
    );

  return (
    <div>
      <p className={styles.voteTexte}>
        Quelle est l&apos;emoji qui correspond le mieux à cette musique ?
      </p>
      <ul className={styles.emojis}>
        {emojis.length > 0 &&
          emojis.map((emoji) => (
            <li
              key={emoji}
              className={`${styles.emoji}
                      ${activeEmoji === emoji ? styles.active : ""}`}
              onClick={() => setActiveEmoji(emoji)}
            >
              <Image
                src={`/emojis/${emoji}`}
                width={50}
                height={50}
                alt={`Emoji ${emoji}`}
              />
            </li>
          ))}
        <li className={styles.emoji} onClick={() => get_emojis()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path
              d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"
              fill="currentColor"
            />
          </svg>
        </li>
      </ul>
    </div>
  );
}
