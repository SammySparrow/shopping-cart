import { Outlet } from "react-router";
import { useState } from "react";
import { useStoreData } from "./Logic";
import Nav from "./components/Nav/Nav";

export default function App() {
  const { shopItems, error, loading } = useStoreData();
  const [cartList, setCartList] = useState([]);

  return (
    <>
      <Nav count={cartList.length} />
      <Outlet
        context={{
          cart: cartList,
          addToCart: setCartList,
          shopItems: shopItems,
          error: error,
          loading: loading,
        }}
      />
    </>
  );
}
