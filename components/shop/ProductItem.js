import React from 'react';
import { Button, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';

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
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            <View style={styles.btns}>
              <Button color={Colors.primary} title="View Details" onPress={props.onViewDetails} />
              <Button color={Colors.primary} title="Add to Cart" onPress={props.onAddToCart} />
            </View>
          </View>
        </View>
      </TouchAble>
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
  },
  imgContainer: {
    width: '100%',
    height: 200,
    marginBottom: 5,
    backgroundColor: '#f9f9f9'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  metaContainer: {
    padding: 15
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 14,
    fontFamily: 'open-sans',
    color: '#888',
    marginBottom: 10
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 3
  }
});
 
export default ProductItem;