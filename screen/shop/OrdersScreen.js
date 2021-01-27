import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react/cjs/react.development';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as OrdersAction from '../store/actions/OrdersAction';

const OrderScreen = props => {
  const [isLoading, setIsloading] = useState(false);

  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);

  useEffect(() => {
    setIsloading(true);
    dispatch(OrdersAction.fetchOrders()).then(() => {
      setIsloading(false);
    });
  }, [dispatch]);

  if(isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      contentContainerStyle={{padding: 5}}
      renderItem={itemData => (
        <OrderItem
          id={itemData.item.id}
          items={itemData.item.items}
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          orderDetails={() => {}}
        />
      )}
    />
  );
}

OrderScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
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
 
export default OrderScreen;