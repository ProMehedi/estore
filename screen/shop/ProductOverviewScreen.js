import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Platform, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import * as CartAction from '../store/actions/CartAction';
import * as ProductsAction from '../store/actions/ProductsAction';
import Colors from '../../constants/Colors';

const ProductOverviewScreen = props => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducs = useCallback(async () => {
    setError(null);
    setIsloading(true);
    try{
      await dispatch(ProductsAction.fetchProducts());
    } catch(err) {
      setError(err.message);
    }
    setIsloading(false);
  }, [dispatch, setIsloading, setError])

  useEffect(() => {
    loadProducs();
  }, [dispatch, loadProducs]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    })
  }

  if(error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!!</Text>
        <Button
          title='Try Again!'
          onPress={loadProducs}
          color={Colors.primary}
        />
      </View>
    )
  }

  if(isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if(!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found!!</Text>
        <Text>Maybe add some product</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      contentContainerStyle={{padding: 5}}
      numColumns={2}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title)
          }}
        >
          <Ionicons
            name={Platform.OS === 'android' ? 'md-document-text-outline' : 'ios-document-text-outline'}
            size={23}
            color={Colors.primary}
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title)
            }}
          />
          <Ionicons
            name={Platform.OS === 'android' ? 'md-cart-outline' : 'ios-cart-outline'}
            size={23}
            color={Colors.primary}
            onPress={() => {
              dispatch(CartAction.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
}

ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ProductOverviewScreen;