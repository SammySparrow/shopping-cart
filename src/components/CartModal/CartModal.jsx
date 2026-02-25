import { useRef, useEffect } from "react";
import styles from "./CartModal.module.css";
import Button from "../Button/Button";
import { Link } from "react-router";
import CartModalItem from "../CartModalItem/CartModalItem";

export default function CartModal({
  cartList,
  display,
  toggle,
  quantityEdit,
  deleteItem,
}) {
  const ref = useRef();
  useEffect(() => {
    display ? ref.current.showModal() : ref.current.close();
  }, [display]);

  return (
    <dialog className={styles.modal} ref={ref} onCancel={toggle}>
      <button className={styles.close} onClick={toggle}>
        &#128473;
      </button>
      <h2>Cart</h2>
      {cartList.length <= 0 ? (
        <>
          <p>Nothing here yet!</p>{" "}
          <Link to="/shop/browse">
            <Button onClick={toggle} label="Go to shop" />
          </Link>
        </>
      ) : (
        <>
          <div>
            {cartList.map((cartItem) => (
              <CartModalItem
                key={cartItem.id}
                id={cartItem.id}
                title={cartItem.title}
                image={cartItem.image}
                price={cartItem.price}
                quantity={cartItem.quantity}
                quantityEdit={quantityEdit}
                deleteItem={deleteItem}
              />
            ))}
          </div>
          <p>
            Total Price:{" "}
            <span className={styles.price}>
              $
              {cartList
                .reduce((a, b) => a + b.price * b.quantity, 0)
                .toFixed(2)}
            </span>
          </p>
          <div className={styles.buttons}>
            <Button
              type="secondary"
              label="Continue shopping"
              onClick={toggle}
            />

            <Link to="/checkout">
              <Button type="secondary" label="Checkout" onClick={toggle} />
            </Link>
          </div>
        </>
      )}
    </dialog>
  );
}
