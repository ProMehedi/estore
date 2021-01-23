import React from 'react';
import { Button, Platform, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as CartAction from '../store/actions/CartAction';
import { Ionicons } from '@expo/vector-icons';

const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const displatch = useDispatch();

  return (
    <FlatList
      // numColumns={6}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetails={() => {
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            })
          }}
          onAddToCart={() => {
            displatch(CartAction.addToCart(itemData.item));
          }}
        />
      )}
    />
  );
}

ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
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
    ),
    // headerLeft: () => (
    //   <View style={{paddingLeft: 20}}>
    //     <Button
    //       title="oi"
    //       color="black"
    //     />
    //   </View>
    // )
  }
}

export default ProductOverviewScreen;