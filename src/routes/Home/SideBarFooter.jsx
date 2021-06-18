import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { getSymbol } from "../../utils/helper";
import "../../assets/stylesheet/side-bar-footer.scss";

const SideBarFooter = ({cart, sideBarVisible, setSideBarVisible}) => {

  const totalPrice = () => (
    cart.data && cart.data.reduce((a, b) => a + ((b['price'] * b.count) || 0), 0)
  )
  return (
    <div className="FooterContainer"> 
    <hr />
    <div className="total">
      <h3>Subtotal</h3>
      <p>{`${getSymbol(cart.currency)}${totalPrice()}.00`}</p>
    </div>
    <div onClick={() => setSideBarVisible(!sideBarVisible)} className={classNames('checkout-cta', { openSideBar: sideBarVisible })}>PROCEED TO CHECKOUT</div>
    </div>
  );
};

SideBarFooter.propTypes = {
  cart: PropTypes.object,
};

export default SideBarFooter;
