import React, { useState } from 'react';
import Product from "./Product";
import Header from "../../components/Header";
import classNames from 'classnames';
import SubNav from "./SubNav";
import SideBar from "./SideBar";
import CartProvider from "../../provider/cart/CartProvider";
import ProductProvider from "../../provider/product/ProductProvider";
import "../../assets/stylesheet/home-page.scss";

const HomePage = () => {

  const [sideBarVisible, setSideBarVisible] = useState(false);

  return (
    <ProductProvider>
      <CartProvider>
        <SideBar sideBarVisible={sideBarVisible} setSideBarVisible={setSideBarVisible}/>
        <div className={classNames('productWrapper', { expandedHomeWrapper: sideBarVisible })}>
          <Header />
          <SubNav />
          <Product sideBarVisible={sideBarVisible} setSideBarVisible={setSideBarVisible} />
        </div>
      </CartProvider>
    </ProductProvider>
  )
};

export default HomePage;
