"use client";

import { useState, useRef } from "react";
import styles from "./MusicPlayer.module.scss";

type MusicPlayerProps = {
  previewUrl: string | undefined;
};

export default function MusicPlayer({
  previewUrl,
}: MusicPlayerProps): JSX.Element {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playPauseAudio = () => {
    if (audioRef === null || audioRef.current === null) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  if (!previewUrl) return <></>;
  return (
    <div className={styles.preview}>
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          setCurrentTime(audioRef.current!.currentTime);
          setDuration(audioRef.current!.duration);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={previewUrl} type="audio/mpeg" />
      </audio>
      <button className={styles.playpause} onClick={playPauseAudio}>
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
      <div className={styles.background} onClick={playPauseAudio}>
        <div
          className={styles.progress}
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
