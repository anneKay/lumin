import React, { useState, useEffect, lazy, Suspense, useContext } from 'react';
import classNames from 'classnames';
import { useQuery, useLazyQuery } from 'react-apollo';
import GET_PRODUCTS from "../../query/get_products_query";
import CartContext from "../../provider/cart/CartContext";
import ProductContext from "../../provider/product/ProductContext";
import GET_CURRENCY from "../../query/get_currency";
import ProductFooter from "./ProductFooter";
import SideBarFooter from "./SideBarFooter";
import { updatePrice } from "../../utils/helper";
import "../../assets/stylesheet/side-bar.scss";

const Image = lazy(() => import("./Image"));

const SideBar = ({ sideBarVisible, setSideBarVisible }) => {

  const [currency, setCurrency] = useState('USD');
  const currencyResponse = useQuery(GET_CURRENCY);

  let currencies = [];
  (currencyResponse.loading || currencyResponse.error) ? currencies = [] : currencies = currencyResponse.data.__type.enumValues;
  const { cart, setCart } = useContext(CartContext);
  const { setProducts, products } = useContext(ProductContext);
  const [getProducts, { loading, data, error }] = useLazyQuery(GET_PRODUCTS);

  const handleChange = async (event) => {
    if (event.target && event.target.value) {
      await getProducts({ variables: { currency: event.target.value } });
      console.log(error, 'Pppppppppppp')
      setCurrency(event.target.value);
    }
  }
  useEffect(() => {
    (async () => {
      if (data) {
        const newCart = updatePrice([...cart], data.products)
        setCart([...cart], newCart);
        setProducts({...products, currency: currency, data: data.products});
      }
    })()
  },[data])

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
      {cart.length > 0 && cart.map((product) => (
      <>
        {error && <p className="error">Unable to update price at this time</p>}
        <div key={`id---${product.id}`} className="product-details">
          <span className="close-button">&times;</span>
          <p className="product-name">{product.title}</p>
          <Suspense fallback="Loading ...">
            <Image src={product.image_url} />
          </Suspense>
          <ProductFooter loading={loading} product={product} />
        </div>
        <SideBarFooter cart={cart} />
      </>
      ))}
    </section>
  );
};

export default SideBar;
