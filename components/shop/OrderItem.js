import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from './CartItem';

const OrderItem = props => {
  return (
    <View style={styles.container}>
      <View style={styles.summery}>
        <View style={styles.amount}>${props.amount.toFixed(2)}</View>
        <View style={styles.date}>{props.date}</View>
      </View>
      <CartItem />
      <Button
        title="Show Details"
        color={Colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 6,
    backgroundColor: 'white',
    minHeight: 200,
    margin: 15,
    overflow: 'hidden'
  }
})
 
export default OrderItem;