import Button from "../../components/Button/Button";
import QuantityInput from "../../components/QuantityInput/QuantityInput";
import StarDisplay from "../../components/StarDisplay/StarDisplay";
import { Link } from "react-router";
import { useState } from "react";
import styles from "./Item.module.css";

export default function Item({ item, array, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  function handleQuantityChange(e) {
    if (e.target.value <= 0 || e.target.value >= 100) return;
    setQuantity(e.target.value);
  }
  function handleQuantityIncrement() {
    let quantityParse = parseInt(quantity);
    if (quantityParse === 99) return;
    setQuantity(quantityParse + 1);
  }
  function handleQuantityDecrement() {
    let quantityParse = parseInt(quantity);
    if (quantityParse === 1) return;
    setQuantity(quantityParse - 1);
  }
  const related = array.filter(
    (arrItem) =>
      item.category === arrItem.category && item.title !== arrItem.title,
  );
  return (
    <section className={styles.wrapper}>
      <Link className={styles.back} to="/shop/browse">
        &larr; Back to shop
      </Link>
      <div className={styles.imgwrapper}>
        <img src={item.image} alt="" />
      </div>
      <div className={styles.textwrapper}>
        <h3>{item.title}</h3>
        <div className={styles.row}>
          <StarDisplay rating={item.rating.rate} count={item.rating.count} />
          <p className={styles.price}>{`$${item.price}`}</p>
        </div>
        <p>{item.description}</p>

        <QuantityInput
          value={quantity}
          onChange={handleQuantityChange}
          increment={handleQuantityIncrement}
          decrement={handleQuantityDecrement}
        />
        <Button
          onClick={() =>
            addToCart(item.title, item.price, item.image, quantity)
          }
          label="Add to cart"
        />
      </div>
      <div className={styles.more}>
        <p>More like this:</p>
        <div className={styles.related}>
          {related.map((rel) => (
            <Link
              key={rel.id}
              to={`/shop/${rel.id}`}
              onClick={() => setQuantity(1)}
            >
              <img className={styles.preview} src={rel.image} alt="" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
