import { Link } from "react-router";
import Button from "../../components/Button/Button";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.message}>
      <p>An error has occured</p>
      <Link to="/">
        <Button type="secondary" label="Return home" />
      </Link>
    </div>
  );
}
