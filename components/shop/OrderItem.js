import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.inner}
        onPress={() => {
          setShowDetails(prevState => !prevState)
        }}
      >
        <View style={styles.summery}>
          <Text style={styles.id}>Order#: {props.id}</Text>
          <Text style={styles.date}>{props.date}</Text>
          <Text style={styles.amount}>Total Amount: ${props.amount.toFixed(2)}</Text>
        </View>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-document-text-outline' : 'ios-document-text-outline'}
          size={23}
          color={Colors.primary}
          onPress={() => {
            setShowDetails(prevState => !prevState)
          }}
        />
      </TouchableOpacity>
      {showDetails && <View style={styles.cartItems}>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.productId}
              title={cartItem.productTitle}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
            />
          ))}
        </View>}
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
    margin: 5,
    overflow: 'hidden',
    padding: 10
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  id: {
    fontFamily: 'open-sans-bold',
    fontSize: 15
  },
  date: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 12
  },
  amount: {
    fontSize: 14,
    fontFamily: 'open-sans-bold',
    color: Colors.accent,
    marginTop: 10
  },
  cartItems: {
    marginTop: 15,
    borderTopWidth: 2,
    borderColor: Colors.primary
  }
})
 
export default OrderItem;