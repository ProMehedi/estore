import CartItem from "../../../models/CartItem";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/CartAction";

const initialState = {
  items: {},
  totalAmount: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      if( state.items[addedProduct.id] ) {
        console.log('Already Added');
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity +1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sub + productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + productPrice
        }
      } else {
        const newCartItem = new CartItem(1, productPrice, productTitle, productPrice);
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + productPrice
        }
      }
    case REMOVE_FROM_CART:
      const selectedPId = state.items[action.pId];
      const currentQty = selectedPId.quantity;
      let updatedCartItems;
      if(currentQty > 1) {
        const updatedCartItem = new CartItem(selectedPId.quantity - 1, selectedPId.productPrice, selectedPId.productTitle, selectedPId.sum - selectedPId.productPrice);
        updatedCartItems = {...state.items, [action.pId]: updatedCartItem}
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.pId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedPId.productPrice
      }
  }
  return state;
}