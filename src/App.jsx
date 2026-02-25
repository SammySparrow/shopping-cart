import { Outlet } from "react-router";
import { useState } from "react";
import { useStoreData } from "./Logic";
import Nav from "./components/Nav/Nav";
import CartModal from "./components/CartModal/CartModal";

export default function App() {
  const { shopItems, error, loading } = useStoreData();
  const [cartList, setCartList] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);

  function toggleModalDisplay() {
    setDisplayModal(!displayModal);
  }

  function addToCart(id, title, price, image, quantity) {
    if (cartList.some((item) => item.id === id)) return;
    const newItem = {
      id: id,
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
      <Nav toggle={toggleModalDisplay} count={cartList.length} />
      <CartModal
        cartList={cartList}
        toggle={toggleModalDisplay}
        display={displayModal}
      />
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
