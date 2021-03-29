/**
 * @description Adds or increments count when item is added to cart
 * @param {Array} cartList the list of products in the cart 
 * @param {Object} product the new selected product to be added
 */
export const updateCart = (cartList, product, action) => {

  const indexOfProduct = cartList.findIndex((cartItem) => cartItem.id === product.id);
  if (indexOfProduct === -1) {
    const newProduct = { ...product, count: 1 };
    return [...cartList, newProduct]
  } 
  const selectedProduct = {...cartList[indexOfProduct]}
  const incrementProduct = {...selectedProduct, count: selectedProduct.count + 1};
  const decrementProduct = {...selectedProduct, count: selectedProduct.count - 1};
  if (selectedProduct.count === 1 && action === "decrement") {
    return cartList.filter((_, i) => i !== indexOfProduct);
  }
  if (action === "decrement") {
    return [
      ...cartList.slice(0, indexOfProduct), 
      decrementProduct, ...cartList.slice(indexOfProduct + 1)
      ]
  }
  return [
    ...cartList.slice(0, indexOfProduct), 
    incrementProduct, ...cartList.slice(indexOfProduct + 1)
  ]
}


/**
 * @description updates price of product in cart 
 * @param {Array} cart the list of products in the cart 
 * @param {Array} product the updated product with new price
 */
 export const updatePrice = (cart, products) => {
  if (products.length > 0 && cart.length > 0) {
    let cartObject = {};
    cart.map(item => cartObject[item.id] = item);
    products.map(product => 
      (product.id in cartObject) && 
      (cartObject[product.id].price = product.price));
    return Object.values(cartObject)
  } else {
    return cart;
  }
}

/**
 * @description returns the right symbol for currency
 * @param {String} currency the selected currency
 */
  export const getSymbol = (currency) => currency === "USD" ? "$" : currency
