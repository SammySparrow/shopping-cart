import { Link } from "react-router";
import StarDisplay from "../StarDisplay/StarDisplay";
import styles from "./ItemCard.module.css";

export default function ItemCard({ props }) {
  return (
    <Link className={styles.link} to="">
      <div className={styles.card}>
        <div>
          <img src={props.image} alt="" />
          <p className={styles.title}>{props.title}</p>
        </div>
        <StarDisplay rating={props.rating.rate} count={props.rating.count} />
      </div>
    </Link>
  );
}
