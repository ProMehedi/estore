import React from 'react';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import * as ProductsAction from '../store/actions/ProductsAction';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const displatch = useDispatch();
  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', {productId: id});
  }

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
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Ionicons
            name={Platform.OS === 'android' ? 'md-create-outline' : 'ios-create-outline'}
            size={23}
            color={Colors.primary}
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash-outline' : 'ios-trash-outline'}
            size={23}
            color={Colors.primary}
            onPress={() => {
              displatch(ProductsAction.deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Add'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditProduct')
          }}
        />
      </HeaderButtons>
    )
  }
}
 
export default UserProductsScreen;