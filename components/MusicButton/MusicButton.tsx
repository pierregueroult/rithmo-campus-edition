"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./MusicButton.module.scss";

type MusicButtonProps = {
  musicExist: boolean | undefined;
  activeEmoji: string | null;
  musicId: string;
};

export default function MusicButton({
  musicExist,
  activeEmoji,
  musicId,
}: MusicButtonProps): JSX.Element {
  const [diff, setDiff] = useState<number>(0);
  const [canVote, setCanVote] = useState<boolean | null>(null);
  const router = useRouter();

  var minutes = 2 - Math.floor(diff / 60000);
  var secondes =
    59 - Math.floor((diff % 60000) / 1000) < 10
      ? "0" + (59 - Math.floor((diff % 60000) / 1000))
      : 59 - Math.floor((diff % 60000) / 1000);

  useEffect(() => {
    async function checkVote() {
      var vote = localStorage.getItem("vote");
      if (vote) {
        var voteTime = Number(vote);
        var now = Date.now();
        setDiff(now - voteTime);

        if (now - voteTime < 180000) {
          setCanVote(false);
          return;
        } else {
          setCanVote(true);
          return;
        }
      } else {
        setCanVote(true);
        return;
      }
    }

    var interval = setInterval(() => {
      checkVote();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  async function buttonHandler() {
    if (canVote) {
      if (!musicExist && !activeEmoji) {
        window.alert("Tu dois choisir un emoji avant de voter !");
        return;
      }
      var token = await getToken();
      var session = localStorage.getItem("session");
      if (!session) {
        throw new Error("No session");
      }
      router.push(
        `/vote/${musicId}/${token}/${session.toString()}/${
          activeEmoji ? activeEmoji : ""
        }`
      );
      return;
    } else {
      window.alert("Attend encore avant de voter !");
      return;
    }
  }

  async function getToken(): Promise<string> {
    const res = await fetch("/api/token");
    const { access_token } = await res.json();
    if (!access_token) {
      throw new Error("No token");
    }
    return access_token;
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => router.back()}>
        Retour
      </button>
      <button className={styles.button} onClick={buttonHandler}>
        {/* display {minutes}:{secondes} */}
        {canVote === null
          ? "Chargement..."
          : canVote
          ? "Ajouter un vote"
          : "Attend encore " + minutes + ":" + secondes}
      </button>
    </div>
  );
}
