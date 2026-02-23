import { Link, useOutletContext } from "react-router";
import LoadingCircle from "../../components/LoadingWheel/LoadingCircle";
import styles from "./Shop.module.css";
import Button from "../../components/Button/Button";

export default function Shop() {
  const { loading, error, shopItems } = useOutletContext();

  if (loading)
    return (
      <div className={styles.message}>
        <LoadingCircle />
        <p>Loading</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.message}>
        <p>An error has occured</p>
        <Link to="/">
          <Button type="secondary" label="Return home" />
        </Link>
      </div>
    );
}
