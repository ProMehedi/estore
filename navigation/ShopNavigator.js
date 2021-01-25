import React from 'react';
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import Colors from "../constants/Colors";
import CartScreen from "../screen/shop/CartScreen";
import OrderScreen from "../screen/shop/OrdersScreen";
import ProductDetailsScreen from "../screen/shop/ProductDetailsScreen";
import ProductOverviewScreen from "../screen/shop/ProductOverviewScreen";
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from '../screen/user/UserProductsScreen';
import EditProductScreen from '../screen/user/EditProductScreen';

const defaultNavOpt = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNagivator = createStackNavigator({
  ProductsOverview: ProductOverviewScreen,
  ProductDetail: ProductDetailsScreen,
  Cart: CartScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavOpt
});

const OrderNavigator = createStackNavigator({
  Orders: OrderScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavOpt
});

const AdminNavigator = createStackNavigator({
  UserProducts: UserProductsScreen,
  EditProduct: EditProductScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavOpt
});

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNagivator,
  Orders: OrderNavigator,
  Admin: AdminNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  }
});
 
export default createAppContainer(ShopNavigator);