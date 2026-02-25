import QuantityInput from "../QuantityInput/QuantityInput";
import DeleteButton from "../DeleteButton/DeleteButton";
import styles from "./CartModalItem.module.css";

export default function CartModalItem({
  id,
  title,
  image,
  price,
  quantity,
  quantityEdit,
  deleteItem,
}) {
  function quantityChange(e) {
    if (
      e.target.value <= 0 ||
      e.target.value >= 100 ||
      /[^0-9]/.test(e.target.value)
    )
      return;
    quantityEdit(id, e.target.value);
  }

  function incrementQuantity() {
    let parseQuantity = parseInt(quantity);
    if (parseQuantity === 99) return;
    quantityEdit(id, parseQuantity + 1);
  }

  function decrementQuantity() {
    let parseQuantity = parseInt(quantity);
    if (parseQuantity === 1) return;
    quantityEdit(id, parseQuantity - 1);
  }
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={image} alt="" />
      <div className={styles.innerWrap}>
        <h3>{title}</h3>
        <p className={styles.price}>{`$${(price * quantity).toFixed(2)}`}</p>
      </div>
      <QuantityInput
        onChange={quantityChange}
        value={quantity}
        increment={incrementQuantity}
        decrement={decrementQuantity}
      />
      <DeleteButton onClick={deleteItem} id={id} />
    </div>
  );
}
