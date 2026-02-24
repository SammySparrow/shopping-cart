import styles from "./QuantityInput.module.css";

export default function QuantityInput({ onChange, value }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.quantity}>Quantity: </p>
      <button className={styles.button}>-</button>
      <input
        className={styles.input}
        onChange={onChange}
        value={value}
        type="text"
      />
      <button className={styles.button}>+</button>
    </div>
  );
}
