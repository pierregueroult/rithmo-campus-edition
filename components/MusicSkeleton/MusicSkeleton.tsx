import styles from "./MusicSkeleton.module.scss";

export default function MusicSkeleton(): JSX.Element {
  return (
    <li className={styles.music}>
      <div className={styles.top}>
        <div className={styles.description}>
          <div className={styles.image}></div>
          <div className={styles.text}>
            <div className={styles.title}></div>
            <div className={styles.artist}></div>
          </div>
        </div>
        <div className={styles.votes}></div>
      </div>
    </li>
  );
}
