import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import ShopNavigator from './navigation/ShopNavigator';
import ProductsReducer from './screen/store/reducers.js/ProductsReducer';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import CartReducer from './screen/store/reducers.js/CartReducer';
import OrdersReducer from './screen/store/reducers.js/OrdersReducer';

const rootReducer = combineReducers({
  products: ProductsReducer,
  cart: CartReducer,
  oders: OrdersReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}
