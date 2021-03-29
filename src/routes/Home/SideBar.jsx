import React, { useState, useEffect, lazy, Suspense, useContext } from 'react';
import classNames from 'classnames';
import { useQuery, useLazyQuery } from 'react-apollo';
import PropTypes from "prop-types";
import GET_PRODUCTS from "../../query/get_products_query";
import CartContext from "../../provider/cart/CartContext";
import ProductContext from "../../provider/product/ProductContext";
import GET_CURRENCY from "../../query/get_currency";
import ProductFooter from "./ProductFooter";
import SideBarFooter from "./SideBarFooter";
import { updatePrice, saveCart } from "../../utils/helper";
import "../../assets/stylesheet/side-bar.scss";

const Image = lazy(() => import("./Image"));

const SideBar = ({ sideBarVisible, setSideBarVisible }) => {

  const [currency, setCurrency] = useState('');
  const currencyResponse = useQuery(GET_CURRENCY);

  let currencies = [];
  (currencyResponse.loading || currencyResponse.error) ? currencies = [] : currencies = currencyResponse.data.__type.enumValues;
  const { cart, setCart } = useContext(CartContext);
  const { setProducts, products } = useContext(ProductContext);
  const [getProducts, { loading, data, error }] = useLazyQuery(GET_PRODUCTS);
  saveCart(cart);

  const handleChange = async (event) => {
    if (event.target && event.target.value) {
      await getProducts({ variables: { currency: event.target.value } });
      setCurrency(event.target.value);
    }
  }
  useEffect(() => {
    (async () => {
      if (data) {
        const newCart = updatePrice([...cart.data], data.products)
        setCart({...cart, data: newCart, currency,})
        setProducts({...products, currency: currency, data: data.products});
      }
      saveCart(cart);
    })()
  },[data, currency])

  return (
    <section className={classNames('sideBar', { openSideBar: sideBarVisible })}>
      <span className="closeSideContainer">
        <div onClick={() => setSideBarVisible(!sideBarVisible)}>
          <span className="left"></span>
        </div>
      </span>
      <p className="sideBar-heading">YOUR CART</p>
      <select name="currency" id="currency"
        onChange={event => handleChange(event)}
      >
      {currencies.map((currency, index) => (
        <option key={index} value={currency.name}>
          {currency.name}
        </option>
      ))}
    </select>
    {error && <p className="error">Unable to update price at this time</p>}
      {Object.keys(cart).length > 0 && cart.data.map((product) => (
      <>
        <div key={`id---${product.id}`} className="product-details">
          <span className="close-button">&times;</span>
          <p className="product-name">{product.title}</p>
          <Suspense fallback="Loading ...">
            <Image src={product.image_url} />
          </Suspense>
          <ProductFooter loading={loading} currency={currency} product={product} />
        </div>
        <SideBarFooter currency={currency} cart={cart} />
      </>
      ))}
    </section>
  );
};


SideBar.propTypes = {
  setSideBarVisible: PropTypes.func.isRequired,
  sideBarVisible: PropTypes.bool.isRequired,
};

export default SideBar;
