import styles from "./Button.module.css";

export default function Button({
  type = "primary",
  label = "Button",
  onClick,
}) {
  return (
    <button onClick={onClick} className={styles[type]}>
      {label}
    </button>
  );
}
