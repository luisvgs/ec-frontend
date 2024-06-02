import React from "react";
import useCartStore from "./store/store";

const CartStateInspector = () => {
  const cart = useCartStore((state) => state.cart);

  console.log("Cart state:", cart);

  return null;
};

export default CartStateInspector;
