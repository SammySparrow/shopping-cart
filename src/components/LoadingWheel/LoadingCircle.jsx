import styles from "./LoadingCircle.module.css";

export default function LoadingCircle() {
  return (
    <div>
      <svg
        className={styles.loader}
        height="80"
        width="80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle r="35" cx="40" cy="40" fill="none" strokeWidth="5" />
      </svg>
      <svg
        className={styles.backdrop}
        height="80"
        width="80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle r="35" cx="40" cy="40" fill="none" strokeWidth="5" />
      </svg>
    </div>
  );
}
