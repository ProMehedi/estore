import React from 'react';
import { Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import * as CartAction from '../store/actions/CartAction';
import Colors from '../../constants/Colors';

const ProductOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const displatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    })
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
              displatch(CartAction.addToCart(itemData.item));
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

export default ProductOverviewScreen;