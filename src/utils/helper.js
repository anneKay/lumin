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
  const incrementProduct = {selectedProduct, count: selectedProduct.count + 1};
  const decrementProduct = {selectedProduct, count: selectedProduct.count - 1};
  if (selectedProduct.count === 1 && action === "decrement") {
    return [
      ...cartList.slice(0, indexOfProduct),
      ...cartList.slice(indexOfProduct + 1),
    ];
  }
  if(action === "increment") {
    return [
      ...cartList.slice(0, indexOfProduct), incrementProduct
      ]
  }
  if (action === "decrement") {
    return [
      ...cartList.slice(0, indexOfProduct), decrementProduct
      ]
  }
  
}

/**
 * @description Removes product from cart and returns the new cart
 * @param {Array} cartList the list of products in the cart 
 * @param {Object} product the new selected product to be added
 */
export const removeProductFromCart = (cartList, product) => {
  const indexOfProduct = cartList.findIndex((cartItem) => cartItem.id === product.id);
    if (indexOfProduct === -1) {
      return cartList;
    }
    return [
      ...cartList.slice(0, indexOfProduct),
      ...cartList.slice(indexOfProduct + 1),
    ];
}

