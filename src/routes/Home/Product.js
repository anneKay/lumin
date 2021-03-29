import React, { lazy, Suspense, useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-apollo';
import GET_PRODUCTS from "../../query/get_products_query";
import CartContext from "../../provider/cart/CartContext";
import ProductContext from "../../provider/product/ProductContext";
import { updateCart } from "../../utils/helper";
import "../../assets/stylesheet/product.scss";

const Image = lazy(() => import("./Image"));

const GetProducts = ({ sideBarVisible, setSideBarVisible }) => {

  const { setCart, cart } = useContext(CartContext);
  const { products, setProducts } = useContext(ProductContext);

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { currency: "USD" },
  });

  useEffect(() => {
    if (data) {
      setProducts({...products, data: data.products, currency: 'USD'})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const handleClick = (event, product) => {
    setSideBarVisible(!sideBarVisible);
    const newCart = updateCart(cart, product);
    setCart(cartList => updateCart(cartList, product))
  }

  return (
    <div className="products-body">
      {Object.keys(products).length > 0  && products.data.map((product) => (
        <div key={`id---${product.id}`} className="product-container">
          <Suspense fallback="Loading ...">
            <Image src={product.image_url} />
          </Suspense>
          <h2>{product.title}</h2>
          <h2>{`From ${products.currency === "USD" ? "$" : products.currency}${product.price}.00`}</h2>
          <button onClick={(event) => handleClick(event, product)} className="product-cta">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default GetProducts;
