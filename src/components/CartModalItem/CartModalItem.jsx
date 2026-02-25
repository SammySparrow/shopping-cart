import QuantityInput from "../QuantityInput/QuantityInput";
import DeleteButton from "../DeleteButton/DeleteButton";

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
    if (e.target.value <= 0 || e.target.value >= 100) return;
    quantityEdit(id, e.target.value);
  }

  function incrementQuantity() {
    if (quantity === 99) return;
    quantityEdit(id, quantity + 1);
  }

  function decrementQuantity() {
    if (quantity === 1) return;
    quantityEdit(id, quantity - 1);
  }
  return (
    <div>
      <img src={image} alt="" />
      <div>
        <h3>{title}</h3>
        <p>{`$${(price * quantity).toFixed(2)}`}</p>
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
