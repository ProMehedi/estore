import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import * as CartAction from '../../screen/store/actions/CartAction';
import * as OrdersAction from '../../screen/store/actions/OrdersAction';

const CartScreen = props => {
  const cartTotal = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) => 
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.sumTitle}>Total: <Text style={styles.totalPrice}>${cartTotal.toFixed(2)}</Text></Text>
        <Button
          color={Colors.accent}
          title='Order Now'
          onPress={() => {
            dispatch(OrdersAction.addOrder(cartItems, cartTotal));
            console.log('ORDER PLACED!')
          }}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.productPrice}
              sum={itemData.item.sum}
              onRemove={() => {
                dispatch(CartAction.removeFromCart(itemData.item.productId));
              }}
            />
          )
        }
      />
      <View style={styles.summary}>
        <Text style={styles.sumTitle}>Total: <Text style={styles.totalPrice}>${cartTotal.toFixed(2)}</Text></Text>
        <Button
          color={Colors.accent}
          title='Order Now'
          // disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(OrdersAction.addOrder(cartItems, cartTotal));
            console.log('ORDER PLACED!')
          }}
        />
      </View>
    </View>
  );
}

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  sumTitle: {
    fontSize: 17,
    fontFamily: 'open-sans'
  },
  totalPrice: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
});
 
export default CartScreen;