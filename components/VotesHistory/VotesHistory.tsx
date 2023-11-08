"use client";
import styles from "./VotesHistory.module.scss";
import { useState, useEffect } from "react";
import { LocalStorageTrack } from "@/types/localstorageTrack";
import { useRouter } from "next/navigation";
import LocalMusic from "../LocalMusic/LocalMusic";

type VotesHistoryProps = {
  add: string;
};

export default function VotesHistory({ add }: VotesHistoryProps) {
  const router = useRouter();
  const [tracksState, setTracksState] = useState<LocalStorageTrack[]>([]);

  useEffect(() => {
    var session = localStorage.getItem("session");
    if (!session) router.push("/session");

    async function addMusicToStorage() {
      var lastvoteTime: string | null = localStorage.getItem("vote");
      if (lastvoteTime) {
        var lastvote: number = Number(lastvoteTime);
        var now: number = Date.now();
        // if laste vote was less than 3 minutes ago
        if (now - lastvote < 180000) {
          router.push("/votes");
          return;
        }
        var lastvoteString: string = String(Date.now());
        localStorage.setItem("vote", lastvoteString);
      } else {
        var lastvoteString: string = String(Date.now());
        localStorage.setItem("vote", lastvoteString);
      }

      var res = await fetch(`/api/database/music?session=${session}&id=${add}`);
      var data = await res.json();
      if (data.error) {
        router.push("/votes");
        return;
      }

      var tracks = localStorage.getItem("tracks");

      if (!tracks) {
        var tracksArray: LocalStorageTrack[] = [];
      } else {
        var tracksArray: LocalStorageTrack[] = JSON.parse(tracks);
      }
      tracksArray.push({
        id: data.id,
        artist: data.artist,
        count: data.count,
        title: data.title,
        cover: data.imageCover,
        previewUrl: data.previewUrl ? data.previewUrl : "",
        spotifyId: data.spotifyId,
        emoji: data.emoji,
      });
      localStorage.setItem("tracks", JSON.stringify(tracksArray));
      router.push("/votes");
      return;
    }
    if (add !== "") {
      addMusicToStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [add]);

  useEffect(() => {
    var tracks = localStorage.getItem("tracks");
    if (tracks) {
      setTracksState(JSON.parse(tracks));
    }
  }, []);

  return (
    <section className={styles.container}>
      <aside className={styles.aside}>
        <p className={styles.texte}>
          Votre historique de vote - Votre historique de vote
        </p>
      </aside>
      <ul className={styles.list}>
        {tracksState
          .reverse()
          .slice(0, 6)
          .map((track, id) => (
            <LocalMusic key={id} track={track} />
          ))}
      </ul>
    </section>
  );
}
