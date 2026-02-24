import Button from "../../components/Button/Button";
import QuantityInput from "../../components/QuantityInput/QuantityInput";
import StarDisplay from "../../components/StarDisplay/StarDisplay";

export default function Item({ item }) {
  return (
    <section>
      <div>
        <img src={item.image} alt="" />
      </div>
      <div>
        <h3>{item.title}</h3>
        <div>
          <StarDisplay rating={item.rating.rate} count={item.rating.count} />
          <p>{`$${item.price}`}</p>
        </div>
        <p>{item.description}</p>
        <div>
          <QuantityInput />
          <Button label="Add to cart" />
        </div>
      </div>
    </section>
  );
}
