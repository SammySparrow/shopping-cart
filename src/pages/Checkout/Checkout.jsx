import { Link, useOutletContext } from "react-router";
import Button from "../../components/Button/Button";
import CartModalItem from "../../components/CartModalItem/CartModalItem";
import styles from "./Checkout.module.css";

export default function Checkout() {
  const { cartList, editQuantity, deleteFromCart } = useOutletContext();
  return (
    <section className={styles.wrapper}>
      {cartList.length <= 0 ? (
        <div className={styles.empty}>
          <h2>Nothing here yet!</h2>{" "}
          <Link to="/shop/browse">
            <Button label="Go to shop" />
          </Link>
        </div>
      ) : (
        <div className={styles.checkoutWrap}>
          <div className={styles.cartList}>
            {cartList.map((cartItem) => (
              <CartModalItem
                key={cartItem.id}
                id={cartItem.id}
                title={cartItem.title}
                image={cartItem.image}
                price={cartItem.price}
                quantity={cartItem.quantity}
                quantityEdit={editQuantity}
                deleteItem={deleteFromCart}
              />
            ))}
          </div>
          <div className={styles.confirm}>
            <h1>Checkout</h1>
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
                label="Pay Now"
                onClick={() =>
                  alert(
                    "Mocking a payment option is beyond the scope of this project :[",
                  )
                }
              />
              <Link to="/shop/browse">
                <Button type="secondary" label="Continue shopping" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
