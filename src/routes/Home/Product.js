import React, { lazy, Suspense, useState, useContext } from 'react';
import { useQuery } from 'react-apollo';
import GET_PRODUCTS from "../../query/get_products_query";
import CartContext from "../../provider/cart/CartContext";
import { updateCart } from "../../utils/helper";
import "../../assets/stylesheet/product.scss";

const Image = lazy(() => import("./Image"));

const GetProducts = ({ sideBarVisible, setSideBarVisible }) => {

  const { setCart } = useContext(CartContext);

  // const { loading, error, data } = useQuery(GET_PRODUCTS);
  // const { loading, error, data } = useQuery(GET_PRODUCTS, {
  //   variables: { currency: "USD" },
  // });
  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  const products = [
    {
      "id": 3,
      "title": "Premium-Grade Moisturizing Balm",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/moisturizing-balm.png",
      "price": 29,
      "__typename": "Product"
    },
    {
      "id": 2,
      "title": "No-Nonsense Charcoal Cleanser",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/charcoal-cleanser.png",
      "price": 16,
      "__typename": "Product"
    },
    {
      "id": 42,
      "title": "Clarifying Body Wash",
      "image_url": "https://i.shgcdn.com/b44f5ef8-6bc0-4a4a-8eef-1f7ced30503d/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      "price": 10,
      "__typename": "Product"
    },
    {
      "id": 39,
      "title": "Keratin Recovery Shampoo",
      "image_url": "https://i.shgcdn.com/4c9671b2-8161-4e58-b3b5-cefa74b74a05/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      "price": 12,
      "__typename": "Product"
    },
    {
      "id": 40,
      "title": "Keratin Strengthening Conditioner",
      "image_url": "https://i.shgcdn.com/aaef22bc-bf48-4e0d-81c2-482265460220/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      "price": 10,
      "__typename": "Product"
    },
    {
      "id": 41,
      "title": "Advanced Repair Scalp Treatment",
      "image_url": "https://i.shgcdn.com/f1ae9d7a-ca43-4a2d-a5cf-c45506a47708/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      "price": 15,
      "__typename": "Product"
    },
    {
      "id": 14,
      "title": "Dark Circle Defense",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/dark-circle-defense.png",
      "price": 29,
      "__typename": "Product"
    },
    {
      "id": 47,
      "title": "Intensive Repair Face Mask",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/face-mask.jpg",
      "price": 20,
      "__typename": "Product"
    },
    {
      "id": 43,
      "title": "Anti-Fatigue Eye Patch",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/eye-patch.png",
      "price": 20,
      "__typename": "Product"
    },
    {
      "id": 12,
      "title": "Anti-Wrinkle Defense",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/anti-wrinkle-serum.png",
      "price": 19,
      "__typename": "Product"
    },
    {
      "id": 4,
      "title": "Reload Exfoliating Rub",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/reload-exfoliating-rub.png",
      "price": 16,
      "__typename": "Product"
    },
    {
      "id": 44,
      "title": "Charcoal Cleansing Pore Strip",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/pore-strip.png",
      "price": 20,
      "__typename": "Product"
    },
    {
      "id": 10,
      "title": "Age Management Collection",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/age-management.png",
      "price": 60,
      "__typename": "Product"
    },
    {
      "id": 13,
      "title": "Classic Maintenance",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/classic-maintenance.png",
      "price": 60,
      "__typename": "Product"
    },
    {
      "id": 25,
      "title": "Correction Trio Collection",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/correction-trio.png",
      "price": 60,
      "__typename": "Product"
    },
    {
      "id": 36,
      "title": "The Complete Skincare Gift Set",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/all-products.png",
      "price": 89,
      "__typename": "Product"
    },
    {
      "id": 7,
      "title": "After Hours Recovery Oil",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/recovery-oil.png",
      "price": 19,
      "__typename": "Product"
    },
    {
      "id": 45,
      "title": "Eye Depuffer",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/deflator.png",
      "price": 12,
      "__typename": "Product"
    },
    {
      "id": 46,
      "title": "Hydrating Mist Spray",
      "image_url": "https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/face-mist.png",
      "price": 12,
      "__typename": "Product"
    }
  ]

  const handleClick = (event, product) => {
    setSideBarVisible(!sideBarVisible);
    setCart(cartList => updateCart(cartList, product))
  }
  return (
    <div className="products-body">
      {products.map((product) => (
        <div key={`id---${product.id}`} className="product-container">
          <Suspense fallback="Loading ...">
            <Image src={product.image_url} />
          </Suspense>
          <h2>{product.title}</h2>
          <h2>{`From $${product.price}.00`}</h2>
          <button onClick={(event) => handleClick(event, product)} className="product-cta">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default GetProducts;
