import styles from "./StarDisplay.module.css";

function FullStar() {
  return (
    <span className={styles.wrapper}>
      <svg
        className={styles.star}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
      >
        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
      </svg>
    </span>
  );
}

function HalfStar() {
  return (
    <span className={styles.wrapper}>
      <svg
        className={styles.star}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
      >
        <path d="M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
      </svg>
    </span>
  );
}

function EmptyStar() {
  return (
    <span className={styles.wrapper}>
      <svg
        className={styles.star}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
      >
        <path d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
      </svg>
    </span>
  );
}

export default function StarDisplay({ rating = 2.2, count = 20 }) {
  let starCount = [];
  for (let i = 0; i < 5; i++) {
    if (i > rating) starCount.push(<EmptyStar key={i} />);
    else if (Math.abs(i - rating) > 0.79) starCount.push(<FullStar key={i} />);
    else if (Math.abs(i - rating) < 0.29) starCount.push(<EmptyStar key={i} />);
    else starCount.push(<HalfStar key={i} />);
  }
  return (
    <p className={styles.row}>
      {starCount} {rating} ({count})
    </p>
  );
}
