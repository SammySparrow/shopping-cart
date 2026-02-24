import { Link, useOutletContext, useParams } from "react-router";
import LoadingCircle from "../../components/LoadingWheel/LoadingCircle";
import styles from "./Shop.module.css";
import Button from "../../components/Button/Button";
import ItemCard from "../../components/ItemCard/ItemCard";
import { useState } from "react";

export default function Shop() {
  const { loading, error, shopItems } = useOutletContext();
  const [filteredList, setFilteredList] = useState(null);
  const { id } = useParams();

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
  if (id === "browse")
    return (
      <div className={styles.display}>
        {shopItems.map((item) => (
          <ItemCard key={item.id} props={item} />
        ))}
      </div>
    );
}
