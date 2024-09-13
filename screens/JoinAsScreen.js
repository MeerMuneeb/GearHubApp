import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,Text,TextInput,TouchableOpacity,Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const JoinAsScreen = () => {
    const [joinAs, setJoinAs] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    setJoinAs('');
  }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate('LoginScreen1'); 
//     }, 1000); 

//     return () => clearTimeout(timer); 
//   }, [navigation]);
const handlePress = (role) => {
    setJoinAs(role);
    navigation.navigate('LoginScreen1', { joinAs: role });
  };
    return (
        <View style={styles.container}>
            <Image source={ require('../assets/Home2.png') }
                style={styles.backgroundImage} />
            <TouchableOpacity onPress={() => handlePress('mechanic')}>
            <Image source={ require('../assets/Home4.png') }
                style={styles.mechanic} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('vehicleOwner')}>
            <Image source={ require('../assets/Home3.png') }
                style={styles.carOwn} />     
            </TouchableOpacity>  
        </View>
        );

};

export default JoinAsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
     },
    backgroundImage: {
        position: 'absolute',
        width: Dimensions.get('window').width, 
        // height: Dimensions.get('window').height, 
        resizeMode: 'cover', 
        marginTop:0
    },
    mechanic:{
        position: 'absolute',
        top:294,
        left:41
    },

    carOwn:{ position: 'absolute',
    top:530.6,
    left:41.5 }
});