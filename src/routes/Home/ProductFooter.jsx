import React, { useContext } from "react";
import { updateCart } from "../../utils/helper";
import CartContext from "../../provider/cart/CartContext";

const ProductFooter = ({product}) => {

  const { setCart } = useContext(CartContext);

  function handleClick(product, action) {
    setCart(cartList => {
      return updateCart(cartList, product, action)
    })
  }


  return (
    <div className="product-footer">
      <div className="product-quantity">
        <span onClick={() => handleClick(product, "decrement")} className="minus">&#8722;</span>
        <p>{product.count}</p>
        <span onClick={() => handleClick(product, "increment")} className="plus">&#43;</span>
      </div>
      <p className="price">{`$${product.price}.00`}</p>
    </div>
  )
}

export default ProductFooter;
