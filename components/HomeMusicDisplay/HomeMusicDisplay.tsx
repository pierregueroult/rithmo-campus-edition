"use client";

import { Music } from "@prisma/client";
import { useEffect, useState } from "react";
import { LocalStorageTrack } from "@/types/localstorageTrack";
import LocalMusic from "../LocalMusic/LocalMusic";
import styles from "./HomeMusicDisplay.module.scss";
import MusicSkeleton from "../MusicSkeleton/MusicSkeleton";

type HomeMusicDisplayProps = {
  title: string;
  apiPath: string;
};

export default function HomeMusicDisplay({
  title,
  apiPath,
}: HomeMusicDisplayProps) {
  const [musics, setMusics] = useState<Music[]>([]);

  useEffect(() => {
    const actualize = () => {
      var session = localStorage.getItem("session");
      if (!session) return;
      fetch(`${apiPath}?session=${session}&count=3`)
        .then((res) => res.json())
        .then((data) => {
          setMusics(data);
        });
    };

    actualize();
    var interval = setInterval(actualize, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className={styles.article}>
      <p className={styles.label}>{title}</p>
      <ul className={styles.list}>
        {musics.length > 0
          ? musics.map((music: Music, i: number) => (
              <LocalMusic
                key={i}
                track={
                  {
                    id: music.id,
                    spotifyId: music.spotifyId,
                    title: music.title,
                    artist: music.artist,
                    cover: music.imageCover,
                    count: music.count,
                    emoji: music.emoji,
                    previewUrl: music.previewUrl,
                  } as LocalStorageTrack
                }
                showPreview={false}
              />
            ))
          : [...Array(3)].map((_, i) => <MusicSkeleton key={i} />)}
      </ul>
    </article>
  );
}
