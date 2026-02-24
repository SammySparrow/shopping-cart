import styles from "./QuantityInput.module.css";

export default function QuantityInput({
  onChange,
  value,
  increment,
  decrement,
}) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.quantity}>Quantity: </p>
      <button onClick={decrement} className={styles.button}>
        -
      </button>
      <input
        className={styles.input}
        onChange={onChange}
        value={value}
        type="text"
      />
      <button onClick={increment} className={styles.button}>
        +
      </button>
    </div>
  );
}
