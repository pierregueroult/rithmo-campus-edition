"use client";
import styles from "./MusicSearch.module.scss";
import { useState, useEffect } from "react";
import { useDebounce } from "usehooks-ts";
import { SpotifyTrack } from "@/types/spotifyTrack";
import Music from "../SpotifyMusic/SpotifyMusic";
import { useAnimate, stagger, motion } from "framer-motion";

const staggerSearchItems = stagger(0.1, { startDelay: 0.2 });

export default function MusicSearch(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [searchResults, setSearchResults] = useState<SpotifyTrack[]>([]);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    async function getToken() {
      const res = await fetch("/api/token");
      const json = await res.json();
      setToken(json.access_token);
    }
    getToken();
  }, []);

  useEffect(() => {
    async function searchSongs() {
      if (debouncedSearch.length < 2) {
        setSearchResults([]);
        return;
      }
      if (!token || token.length < 3) return;
      var data = await fetch(`/api/search?q=${debouncedSearch}&token=${token}`);
      var json = await data.json();

      setSearchResults(json.tracks.items);
    }

    searchSongs();
  }, [debouncedSearch, token]);

  useEffect(() => {
    if (document.querySelector(`${styles.searchResults} li`)) {
      animate(
        "li",
        {
          opacity: 1,
          scale: 1,
          x: -20,
          y: 0,
        },
        {
          duration: 0.4,
          delay: staggerSearchItems,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults]);

  return (
    <>
      <div className={styles.searchContainer}>
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          className={styles.searchForm}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <input
            type="text"
            placeholder="Rechercher une musique"
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </motion.form>
      </div>
      <ul className={styles.searchResults} ref={scope}>
        {searchResults.length > 0 &&
          searchResults.map((track: SpotifyTrack) => (
            <Music key={track.id} track={track} />
          ))}
      </ul>
    </>
  );
}
