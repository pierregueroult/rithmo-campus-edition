"use client";

import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { SpotifyTrack } from "@/types/spotifyTrack";
import styles from "./page.module.scss";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import MusicEmojis from "@/components/MusicEmojis/MusicEmojis";
import MusicButton from "@/components/MusicButton/MusicButton";
import { useRouter } from "next/navigation";
import MusicLoading from "@/components/MusicLoading/MusicLoading";

type MusicProps = {
  params: {
    id: string;
  };
};

export default function Music({ params }: MusicProps): JSX.Element {
  const { id } = params;
  const [music, setMusic] = useState<SpotifyTrack | null>(null);
  const [musicExist, setMusicExist] = useState<{
    exists: boolean;
    count: number;
  } | null>(null);
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getMusicData() {
      const resToken = await fetch("/api/token");
      const { access_token } = await resToken.json();
      if (!access_token) return;
      const res = await fetch(`/api/music?id=${id}&token=${access_token}`);
      const data = await res.json();
      if (data.error) {
        router.push("/votes");
        return;
      }
      setMusic(data);

      if (data) music_exist();
    }

    async function music_exist() {
      const res = await fetch(`/api/music-exist?id=${id}`);
      const data = await res.json();
      setMusicExist(data);
    }

    getMusicData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Layout>
      {music ? (
        <>
          <div className={styles.container}>
            <>
              <Image
                src={music.album.images[0].url}
                width={250}
                height={250}
                alt="Pochette de la musique"
                className={styles.image}
              />
              <h2 className={styles.name}>{music.name}</h2>
              <p className={styles.artists}>
                {music.artists.map((artist) => artist.name).join(", ")}
              </p>
            </>
            <MusicPlayer previewUrl={music.preview_url} />
            <MusicEmojis {...{ musicExist, activeEmoji, setActiveEmoji }} />
            <MusicButton
              musicExist={musicExist?.exists}
              activeEmoji={activeEmoji}
              musicId={id}
            />
          </div>
        </>
      ) : (
        <MusicLoading />
      )}
    </Layout>
  );
}
