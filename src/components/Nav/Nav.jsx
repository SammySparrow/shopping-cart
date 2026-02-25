import Cart from "../Cart/Cart";
import { Link } from "react-router";
import styles from "./Nav.module.css";

export default function Nav({ count, toggle }) {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <span className={styles.logo}>Shopping Site</span>
      </Link>
      <div className={styles.linkwrap}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="shop/browse">Shop</Link>
          </li>
          <li>
            <Link to="checkout">Checkout</Link>
          </li>
        </ul>
        <Cart toggle={toggle} count={count} />
      </div>
    </nav>
  );
}
