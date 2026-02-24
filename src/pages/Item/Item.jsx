import Button from "../../components/Button/Button";
import QuantityInput from "../../components/QuantityInput/QuantityInput";
import StarDisplay from "../../components/StarDisplay/StarDisplay";
import { Link } from "react-router";
import styles from "./Item.module.css";

export default function Item({ item, array }) {
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

        <QuantityInput />
        <Button label="Add to cart" />
      </div>
      <div className={styles.more}>
        <p>More like this:</p>
        <div className={styles.related}>
          {related.map((rel) => (
            <Link to={`/shop/${rel.id}`}>
              <img className={styles.preview} src={rel.image} alt="" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
