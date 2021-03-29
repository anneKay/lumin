import React, { useState } from "react";
import CartContext from "./CartContext";
import { loadCart } from "../../utils/helper";

const CartProvider = ({ children }) => {
  const initialCart = loadCart() || {};
  const [cart, setCart] = useState(initialCart);

  return (
    <CartContext.Provider 
      value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
