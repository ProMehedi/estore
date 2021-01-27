import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as ProductsAction from '../../screen/store/actions/ProductsAction';

const EditProductScreen = props => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state => 
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [validTitle, setValidTitle] = useState(false);
  const [imgUrl, setImgUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState(editedProduct ? editedProduct.description : '');

  useEffect(() => {
    if(error) {
      Alert.alert('An error occurred', error, [{ text: 'Okay!' }]);
    }
  }, [error])

  const submitHandler = useCallback(async () => {
    if(!validTitle) {
      Alert.alert('Wrong input!', 'Please check the erros on the form!', [
        {text: 'okay'}
      ])
      return;
    }

    setError(null);
    setIsloading(true);

    try{
      if(editedProduct) {
        await dispatch(ProductsAction.updateProduct(prodId, title, desc, imgUrl));
      } else {
        await dispatch(ProductsAction.createProduct(title, desc, imgUrl, +price));
      }
      props.navigation.goBack();
    } catch(err) {
      setError(err.message);
    }

    setIsloading(false);
  }, [dispatch, prodId, title, desc, imgUrl, price]);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler})
  }, [submitHandler])

  const titleChangeHandler = text => {
    if(text.trim().length === 0) {
      setValidTitle(false)
    } else {
      setValidTitle(true)
    }
    setTitle(text)
  }

  if(isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.fromWrap}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder='Product Title'
            value={title}
            onChangeText={titleChangeHandler}
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
          />
        </View>
        {!validTitle && <Text>Please enter a valid title!</Text>}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            placeholder='Product Image URL'
            value={imgUrl}
            onChangeText={text => setImgUrl(text)}
            returnKeyType='next'
          />
        </View>
        {editedProduct ? null : <View style={styles.inputGroup}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder='Product Price'
            value={price}
            onChangeText={text => setPrice(text)}
            keyboardType='decimal-pad'
            returnKeyType='next'
          />
        </View>}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            multiline = {true}
            numberOfLines = {10}
            minHeight={80}
            maxHeight={150}
            style={styles.input}
            placeholder='Product Description'
            value={desc}
            onChangeText={text => setDesc(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');

  return {
    headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Save'
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitFn}
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
  },
  fromWrap: {
    margin: 10,
    padding: 10,
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  inputGroup: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold'
  },
  input: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20
  }
});
 
export default EditProductScreen;