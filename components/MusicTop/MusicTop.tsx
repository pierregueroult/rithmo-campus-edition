"use client";

import { useEffect, useState } from "react";
import { LocalStorageTrack } from "@/types/localstorageTrack";
import LocalMusic from "../LocalMusic/LocalMusic";
import MusicSkeleton from "../MusicSkeleton/MusicSkeleton";

export default function MusicTop() {
  const [musicTop, setMusicTop] = useState([]);

  useEffect(() => {
    async function getTopMusic(sessionId: string | null) {
      if (!sessionId) return;
      const response = await fetch(
        `/api/mostvoted?session=${sessionId}&count=8`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMusicTop(data);
    }

    var session = localStorage.getItem("session");
    getTopMusic(session);
    const interval = setInterval(() => {
      getTopMusic(session);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {musicTop.length > 0
        ? musicTop.map((music: any, i: number) => (
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
        : [...Array(9)].map((_, i) => <MusicSkeleton key={i} />)}
    </>
  );
}
