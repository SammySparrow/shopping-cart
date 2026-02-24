import { useEffect, useState } from "react";

export function useStoreData() {
  const [shopItems, setShopItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((r) => {
        if (r.status === 400) throw new Error("Server error");
        return r.json();
      })
      .then((r) => {
        setShopItems(r);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { shopItems, error, loading };
}
