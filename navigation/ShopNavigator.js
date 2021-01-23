import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import Colors from "../constants/Colors";
import CartScreen from "../screen/shop/CartScreen";
import ProductDetailsScreen from "../screen/shop/ProductDetailsScreen";
import ProductOverviewScreen from "../screen/shop/ProductOverviewScreen";

const ProductsNagivator = createStackNavigator({
  ProductsOverview: ProductOverviewScreen,
  ProductDetail: ProductDetailsScreen,
  Cart: CartScreen
}, {
  defaultNavigationOptions: {
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
});
 
export default createAppContainer(ProductsNagivator);