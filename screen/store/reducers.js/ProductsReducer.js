import PRODUCTS from "../../../data/dummy-data";
import Product from "../../../models/Product";
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from "../actions/ProductsAction";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.products.filter(prod => prod.ownerId === 'u1')
      }

    case CREATE_PRODUCT:
      const newProduct = new Product(
          action.productData.id,
          'u1',
          action.productData.title,
          action.productData.imageUrl,
          action.productData.description,
          action.productData.price
        );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.availableProducts.concat(newProduct)
      }
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(prod => prod.id === action.pId);
      const updatedProduct = new Product(
          action.pId,
          state.userProducts[productIndex].ownerId,
          action.productData.title,
          action.productData.imageUrl,
          action.productData.description,
          state.userProducts[productIndex].price
        )
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProdIndex = state.availableProducts.findIndex(prod => prod.id === action.pId);
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProdIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== action.pId),
        availableProducts: state.availableProducts.filter(product => product.id !== action.pId)
      }
  }
  return state;
}