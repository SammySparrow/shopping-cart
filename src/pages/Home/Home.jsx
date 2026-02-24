import Button from "../../components/Button/Button";
import { Link } from "react-router";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <section className={styles.hero}>
      <img src="./src/assets/purple-cart.jpg" alt="" />
      <div>
        <h1>
          A one stop shop for{" "}
          <span className={styles.highlight}>all your needs</span>
        </h1>
        <p>Consume product, buy thing, make happy, dopamine good</p>
        <Link to="shop/browse">
          <Button label="Shop now" />
        </Link>
      </div>
    </section>
  );
}
