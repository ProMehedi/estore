import React from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const AuthScreen = props => {
  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
    >
      <View style={styles.container}>
        <View style={styles.inner}>
          <Image
            source={{uri: 'https://img.icons8.com/clouds/2x/favorite-cart.png'}}
            style={styles.logo}
          />
          <Text style={styles.title}>Login to your account!</Text>
          <View style={styles.inputGroup}>
            <AntDesign style={styles.labelIcon} name="user" size={24} color={Colors.primary} />
            <TextInput
              style={styles.input}
              placeholder='Username'
            />
          </View>
          <View style={styles.inputGroup}>
            <AntDesign style={styles.labelIcon} name="lock" size={24} color={Colors.primary} />
            <TextInput
              style={styles.input}
              placeholder='Password'
              onChangeText={() => {}}
              returnKeyType='next'
            />
          </View>
          <View style={styles.btn}>
            <Text style={styles.btnText}>ENTER</Text>
            <AntDesign style={styles.btnIcon} name="right" size={16} color='#fff' />
          </View>
        </View>
        <View style={styles.signUp}>
          <Text style={styles.signUpText}>Not a member? Sign Up Now!</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

AuthScreen.navigationOptions = {
  headerTitle: 'Authentication'
}

const styles =StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 4,
    backgroundColor: 'white',
    minHeight: 180,
    margin: 10,
    overflow: 'hidden',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: '#888',
    marginBottom: 30
  },
  inputGroup: {
    width: '80%',
  },
  labelIcon: {
    marginBottom: -28
  },
  input: {
    paddingVertical: 5,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    marginVertical: 20
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'open-sans-bold'
  },
  btnIcon: {
    marginLeft: 5
  },
  signUp: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  signUpText: {
    fontFamily: 'open-sans-bold',
    color: Colors.accent,
    fontSize: 15
  }
});
 
export default AuthScreen;