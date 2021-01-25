import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const CartItem = props => {
  return (
    <View style={styles.products}>
      <View>
        <View style={styles.row}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.qty}> x{props.quantity}</Text>
        </View>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
      </View>
      {props.deletable && <TouchableOpacity
        styles={styles.delBtn}
        onPress={props.onRemove}
      >
        <Ionicons
          name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
          size={23}
          color='red'
        />
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  products: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  qty: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 15
  },
  amount: {
    fontFamily: 'open-sans',
    fontSize: 13,
    color: Colors.primary
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 14
  },
  delBtn: {

  }
});
 
export default CartItem;