import { Outlet } from "react-router";
import { useState } from "react";
import { useStoreData } from "./Logic";
import Nav from "./components/Nav/Nav";

export default function App() {
  const { shopItems, error, loading } = useStoreData();
  const [cartList, setCartList] = useState([]);

  function addToCart(title, price, image, quantity) {
    if (cartList.some((item) => item.title === title)) return;
    const newItem = {
      title: title,
      price: price,
      image: image,
      quantity: quantity,
    };
    const newCartList = structuredClone(cartList);
    newCartList.push(newItem);
    setCartList(newCartList);
  }

  return (
    <>
      <Nav count={cartList.length} />
      <Outlet
        context={{
          addToCart,
          shopItems,
          error,
          loading,
        }}
      />
    </>
  );
}
