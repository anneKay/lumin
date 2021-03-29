import React, { useContext } from "react";
import PropTypes from "prop-types";
import { updateCart, getSymbol } from "../../utils/helper";
import CartContext from "../../provider/cart/CartContext";

const ProductFooter = ({ product, loading }) => {

  const { cart, setCart } = useContext(CartContext);

  function handleClick(product, action) {
    setCart({...cart, data: updateCart(cart.data || [], product, action)});
  }

  return (
    <div className="product-footer">
      <div className="product-quantity">
        <span onClick={() => handleClick(product, "decrement")} className="minus">&#8722;</span>
        <p>{product.count}</p>
        <span onClick={() => handleClick(product, "increment")} className="plus">&#43;</span>
      </div>
      {!loading && <p className="price">{`${getSymbol(cart.currency)}${product.price}.00`}</p>}
    </div>
  )
}

ProductFooter.propTypes = {
  product: PropTypes.object,
  loading: PropTypes.bool,
};


export default ProductFooter;
