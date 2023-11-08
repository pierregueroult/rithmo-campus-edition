"use client";

import Image from "next/image";
import styles from "./SpotifyMusic.module.scss";
import { SpotifyTrack } from "@/types/spotifyTrack";
import { useRef, useState } from "react";
import Link from "next/link";

type MusicProps = {
  track: SpotifyTrack;
  emoji?: string;
  count?: number;
};

export default function Music({
  track,
  emoji,
  count,
}: MusicProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPauseAudio = () => {
    if (audioRef === null || audioRef.current === null) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <li key={track.id} className={`${styles.music} ${track.id}`}>
      <div className={styles.music__top}>
        <div className={styles.music__description}>
          <Image
            src={track.album.images[2].url}
            width={50}
            height={50}
            alt={track.name}
          />
          <span className={styles.music__text}>
            <h3>
              {track.name.substring(0, 18) +
                (track.name.length > 18 ? "..." : "")}
            </h3>
            <p>
              {track.artists
                .map((artist) => artist.name)
                .join(", ")
                .substring(0, 18) +
                (track.artists.map((artist) => artist.name).join(", ").length >
                18
                  ? "..."
                  : "")}
            </p>
          </span>
        </div>
        <Link className={styles.music__vote} href={`/music/${track.id}`}>
          {emoji && count ? (
            <Image
              src={`/emojis/emoji-${emoji}.png`}
              width={30}
              height={30}
              alt={emoji}
            />
          ) : (
            "UP!"
          )}
        </Link>
      </div>
      {track.preview_url && (
        <div className={styles.music__bottom}>
          <audio
            ref={audioRef}
            onTimeUpdate={() => {
              setCurrentTime(audioRef.current!.currentTime);
              setDuration(audioRef.current!.duration);
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={track.preview_url} type="audio/mpeg" />
          </audio>
          <button
            className={styles.music__player__controls}
            onClick={playPauseAudio}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
              </svg>
            )}
          </button>
          <div
            className={styles.music__player__background}
            onClick={playPauseAudio}
          >
            <div
              className={styles.music__player__progress}
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </li>
  );
}
