import React from 'react';
import { Button, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const ProductItem = props => {
  const TouchAble = Platform.OS === 'android' && Platform.Version <= 21 ? TouchableOpacity : TouchableNativeFeedback;

  return (
    <View style={styles.container}>
      <TouchAble onPress={props.onViewDetails} useFoground>
        <View>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={{uri: props.image}}
            />
          </View>
          <View style={styles.metaContainer}>
            <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            <View style={styles.btns}>
              {/* <Button color={Colors.primary} title="View Details" onPress={props.onViewDetails} /> */}
              {/* <Button color={Colors.primary} title="Add to Cart" onPress={props.onAddToCart} /> */}
              <Ionicons
                name={Platform.OS === 'android' ? 'md-link' : 'ios-link'}
                size={23}
                color={Colors.primary}
                onPress={props.onViewDetails}
              />
              <Ionicons
                name={Platform.OS === 'android' ? 'md-cart-outline' : 'ios-cart-outline'}
                size={23}
                color={Colors.primary}
                onPress={props.onAddToCart}
              />
            </View>
          </View>
        </View>
      </TouchAble>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 4,
    backgroundColor: 'white',
    minHeight: 180,
    margin: 5,
    overflow: 'hidden'
  },
  imgContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#f9f9f9'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  metaContainer: {
    padding: 10
  },
  title: {
    fontSize: 14,
    marginVertical: 4,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 12,
    fontFamily: 'open-sans',
    color: '#888',
    marginBottom: 5
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 3
  }
});
 
export default ProductItem;