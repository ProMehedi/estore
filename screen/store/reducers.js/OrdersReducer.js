import Order from "../../../models/Order";
import { ADD_ORDER } from "../actions/OrdersAction";

const initialState = {
  orders: []
}

export default ( state = initialState, action ) => {
  switch(action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      )
    return {
      ...state,
      orders: state.orders.concat(newOrder)
    }
  }
  return state;
}