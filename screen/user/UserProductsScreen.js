import React from 'react';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts)

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      numColumns={2}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
}

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Prodcuts',
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
    // headerRight: () => (
    //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    //     <Item
    //       title='Cart'
    //       iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
    //       onPress={() => {
    //         navData.navigation.navigate('Cart')
    //       }}
    //     />
    //   </HeaderButtons>
    // )
  }
}
 
export default UserProductsScreen;