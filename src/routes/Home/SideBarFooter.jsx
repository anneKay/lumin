import React from "react";
import "../../assets/stylesheet/side-bar-footer.scss";

const SideBarFooter = ({cart}) => {

  const totalPrice = () => (
    cart.reduce((a, b) => a + (b['price'] || 0), 0)
  )
  
  return (
    <div className="FooterContainer"> 
    <hr />
    <div className="total">
      <h3>Subtotal</h3>
      <p>{`${totalPrice()}`}</p>
    </div>
    <div className="checkout-cta">PROCEED TO CHECKOUT</div>
    </div>
  );
};

export default SideBarFooter;
