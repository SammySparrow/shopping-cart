import { Link } from "react-router";

export default function ItemCard({ props }) {
  return (
    <Link to="">
      <img src={props.image} alt="" />
      <p>{props.title}</p>
      <div>placeholder</div>
    </Link>
  );
}
