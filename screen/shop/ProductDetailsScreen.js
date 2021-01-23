import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import * as CartAction from '../store/actions/CartAction'

const ProductDetailsScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state => 
    state.products.availableProducts.find(prod => prod.id === productId)
  );

  const displatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: selectedProduct.imageUrl}}
        />
        <View style={styles.contentWrap}>
          <View style={styles.meta}>
            <View style={styles.metaTitle}>
              <Text style={styles.title}>{selectedProduct.title}</Text>
              <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            </View>
            <Button
              style={styles.btn}
              color={Colors.primary}
              title="Add to Cart"
              onAddToCart={() => {
                displatch(CartAction.addToCart(itemData.item));
              }}
            />
          </View>
          <Text style={styles.desc}>{selectedProduct.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

ProductDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  }
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
  image: {
    width: '100%',
    height: 300
  }, 
  contentWrap: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#f1f1f1'
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  metaTitle: {
    flex: 2
  },
  title: {
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'open-sans'
  },
  btn: {
    flex: 1
  },
  desc: {
    fontSize: 14,
    fontFamily: 'open-sans'
  }
});
 
export default ProductDetailsScreen;