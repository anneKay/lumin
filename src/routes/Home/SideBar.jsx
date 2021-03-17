import React, { useState, useEffect, lazy, Suspense, useContext } from 'react';
import classNames from 'classnames';
import { useQuery } from 'react-apollo';
import GET_PRODUCTS from "../../query/get_products_query";
import CartContext from "../../provider/cart/CartContext";
import CurrencyOptions from "./CurrencySelect";
import ProductFooter from "./ProductFooter";
import "../../assets/stylesheet/side-bar.scss";

const Image = lazy(() => import("./Image"));

const SideBar = ({ sideBarVisible, setSideBarVisible }) => {

  const [currency, setCurrency] = useState('USD');
  const { cart, setCart } = useContext(CartContext);

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { currency: "USD" },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;


  return (
    <section className={classNames('sideBar', { openSideBar: sideBarVisible })}>
      <span className="closeSideContainer">
        <div onClick={() => setSideBarVisible(!sideBarVisible)}>
          <span className="left"></span>
        </div>
      </span>
      <p className="sideBar-heading">YOUR CART</p>
      <CurrencyOptions currency={currency} setCurrency={setCurrency} />
      {cart.length > 0 && cart.map((product) => (
        <div key={`id---${product.id}`} className="product-details">
          <span className="close-button">&times;</span>
          <p className="product-name">{product.title}</p>
          <Suspense fallback="Loading ...">
            <Image src={product.image_url} />
          </Suspense>
          <ProductFooter product={product} />
        </div>
      ))}
    </section>
  );
};

export default SideBar;
