import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,Text,TextInput,TouchableOpacity,Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen1'); 
    }, 1000); 

    return () => clearTimeout(timer); 
  }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={ require('../assets/Home.png') }
                style={styles.backgroundImage} />
        </View>
        );

};

export default SplashScreen;

const styles = StyleSheet.create({
 container: {
    flex: 1, 
  },
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height, 
    resizeMode: 'cover' 
  }


});