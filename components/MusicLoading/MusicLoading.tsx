import styles from "./MusicLoading.module.scss";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.image}></div>
      <div className={styles.title}></div>
      <div className={styles.artists}></div>
      <div className={styles.player}>
        <div className={styles.button}></div>
        <div className={styles.progress}></div>
      </div>
      <div className={styles.buttons}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
