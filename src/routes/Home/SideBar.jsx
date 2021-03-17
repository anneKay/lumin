import React, { useState, useEffect, lazy, Suspense, useContext } from 'react';
import classNames from 'classnames';
import CartContext from "../../provider/cart/CartContext";
import "../../assets/stylesheet/side-bar.scss";

const Image = lazy(() => import("./Image"));

const SideBar = ({ sideBarVisible, setSideBarVisible }) => {

  const { cart } = useContext(CartContext);

  return (
    <section className={classNames('sideBar', { openSideBar: sideBarVisible })}>
      {console.log(cart)}
      <span className="closeSideContainer">
        <div onClick={() => setSideBarVisible(!sideBarVisible)}>
          <span className="left"></span>
        </div>
      </span>
      <p className="sideBar-heading">YOUR CART</p>
      
      <select name="currency" id="currency">
        <option value="USD">USD</option>
      </select>
      {cart.length > 0 && cart.map((product) => (
        <div className="product-details">
          <span className="close-button">&times;</span>
          <p className="product-name">{product.title}</p>
          <Suspense fallback="Loading ...">
            <Image src={product.image_url} />
          </Suspense>
          <div className="product-footer">
            <div className="product-quantity">
              <span className="minus">&#8722;</span>
              <p>1</p>
              <span className="plus">&#43;</span>
            </div>
            <p className="price">{`$${product.price}.00`}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SideBar;
