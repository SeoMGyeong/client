import { Cookies, useCookies } from "react-cookie";
import { ProductType } from "../type";
import { useEffect, useMemo, useState } from "react";

type CartType = ProductType & { count: number };

const COOKIE_KEY = "cart";

const useCart = () => {
  const [cookies, setCookies] = useCookies([COOKIE_KEY]);
  const [carts, setCarts] = useState<CartType[]>([]);

  const productIds = useMemo(
    () => (cookies[COOKIE_KEY] as string[]) ?? [],
    [cookies]
  );
  const addCart = (id: string) => {
    const nextCartIds = [...productIds, id];

    setCookies(COOKIE_KEY, nextCartIds, { path: "/" });
  };

  const getProductById = (id: string) => {
    return fetch(`/product/${id}`).then((response) => response.json());
  };

  useEffect(() => {
    if (productIds && productIds.length) {
      const requestList: Array<Promise<any>> = [];
      const requestIds = productIds.reduce(
        (acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1),
        new Map<string, number>()
      );

      Array.from(requestIds.keys()).forEach((id) => {
        requestList.push(getProductById(id));
      });

      Promise.all(requestList).then((responseList) => {
        const cartData: CartType[] = responseList.map((response) => ({
          ...response.data.product,
          count: requestIds.get(response.data.product.id),
        }));
        setCarts(cartData);
      });
    }
  }, [productIds]);

  const changeCount = (productId: string, mode: "increase" | "decrease") => {
    const index = productIds.indexOf(productId);
    if (index === -1) {
      return;
    }

    if (mode === "decrease") {
      const tempArr = [...productIds];
      tempArr.splice(index, 1);

      setCookies(COOKIE_KEY, tempArr, {
        path: "/",
      });
    }

    if (mode === "increase") {
      setCookies(COOKIE_KEY, [...productIds, productId], {
        path: "/",
      });
    }
  };

  return { carts, addCart };
};

export default useCart;
