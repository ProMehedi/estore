import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const getStars = (value) => {
   switch(value) {
     case 0:
       return '../../assets/stars/0.png';
     case 50:
       return '../../assets/stars/50.png';
     case 100:
       return '../../assets/stars/100.png';
   }
}

const ProductRating = props => {
  const imgUrl = require(getStars(50));
  return (
    <View style={{flexDirection: 'row'}}>
      <Image 
        source={imgUrl}
        style={styles.image}
        />
      {/* {getStars(props.rating).map((rating) => (
        <View style={{flexDirection: 'row'}} key={Math.random(100)}>
          <Image
            source={require('../../assets/stars/50.png')}
            style={styles.image}
          />
        </View>
      ))} */}
      {/* <FlatList
        keyExtractor={Math.random(100)}
        data={props.rating}
        renderItem={() => (
          <View>
            <Image
              style={{flexDirection: 'row'}}
              source={require('../../assets/stars/100.png')}
              style={styles.image}
            />
          </View>
        )}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20
  }
});
 
export default ProductRating;