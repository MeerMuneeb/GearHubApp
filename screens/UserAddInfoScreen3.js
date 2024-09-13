import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,Text,TextInput,TouchableOpacity,Dimensions,PermissionsAndroid, Platform, Linking,Alert
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const UserAddInfoScreen3 = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();

    const [images, setImages] = useState([null, null, null, null, null,null]);
    const [userInfo, setUserInfo] = useState({
      ...user,
      images:images
    });
  
    const selectImage = (index) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: false
        }).then(image => {
          console.log(image);
            const source = { uri: image.path };
            const newImages = [...images];
            newImages[index] = source;
            setImages(newImages);
        }).catch(error => {
            console.log('ImagePicker Error: ', error);
        });
    };
    const registerProfile = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id');
        console.log("id reveiced in registerprofile")
        console.log(user)
        await firestore().collection('users').doc(userId).set({
          
          phoneNumber:user.phoneNumber,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dpimg:user.dpimg,
          regNo: user.regNo,
          make: user.make,
          model: user.model,
          color: user.color,
          year: user.year,
          vehicleType: user.vehicleType,
          images:images
        });
    
    
        ToastAndroid.showWithGravityAndOffset(
          'Registered Successfully!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        console.log('Registered successfully');
        navigation.navigate('SuccessScreen', { user:userInfo })
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };

    const renderImageSlots = () => {
        return images.map((img, index) => (
            <TouchableOpacity key={index} style={[styles.imageSlot, (index >= 3 && styles.bottomRow)]} onPress={() => selectImage(index)}>
                {img ? <Image source={img} style={styles.image} resizeMode="cover" /> : <Image source={ require('../assets/plus.png') } style={styles.image} resizeMode="cover" />}
            </TouchableOpacity>
        ));
    };
    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Image source={ require('../assets/Icon.png') }
                style={styles.back} />
                <Image source={ require('../assets/Logo2.png') }
                style={styles.gearLogo} />
            </View>
            <Text style={[styles.bText1,{marginLeft:100}]}>Add your Vehicle!</Text>
            
            <Text style={[styles.bText1,{marginTop:38}]}>Images</Text>
            <View style={styles.imageContainer}>
                {renderImageSlots()}
            </View>
            <Text style={styles.noteText}>
            <Text style={[styles.noteText,{fontFamily:"Roboto-Bold"}]}>Note:</Text> Add pictures of FRONT, BACK, RIGHT and LEFT sides of the car along with the pictures of the car’s ENGINE image.
            </Text>
            
            











            <TouchableOpacity onPress={() => registerProfile()} style={styles.button}>
                <Text style={styles.buttonText1}>Finish</Text>
            </TouchableOpacity>
           








        </View>
        );

};

export default UserAddInfoScreen3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      },

    header:{
        marginTop:43,
        flexDirection: "row",
        alignItems:"center",
        width:'100%',

      },
    back:{
        marginLeft:20,
        
      },
    gearLogo:{
        width: 118,
        height: 38,
        marginLeft:87
      },
    bText1:{
        // width: 285,
        // height: 32,
        fontFamily: "Roboto-Bold",
        fontSize: 24,
        fontWeight: "bold",
        marginTop:41,
        lineHeight: 32,
        letterSpacing: 0,
        color:'#222730',
        alignSelf:'flex-start',
        marginLeft:24
    },
    bText2:{
        // width: 234,
        // height: 20,
        fontFamily: "Roboto-Medium",
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 20,
        letterSpacing: 0.1,
        textAlign: "left",
        color: "rgba(0, 0, 0, 0.8)"
    },
    otpcontainer:{
      marginTop:23,
      marginBottom:49,
      width:'55%'
    },
    pinCodeContainer:{
    
      borderRadius: 10,
      backgroundColor: "#f0f7ff",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: '#4c4d4e'
    },
    focusStick:{
      backgroundColor:'#4c4d4e'
    },
    pinCodeText:{
      fontFamily: "Roboto-Medium",
      fontSize: 28,
      fontWeight: "600",
      fontStyle: "normal",
      lineHeight: 36,
      letterSpacing: 0,
      color:'#000000'
    },
   
    button: {
        width: 312,
        height: 48,
        backgroundColor: '#222730',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:148
      },
      buttonText1: {
        textAlign: "left",
        color: "rgba(255, 255, 255, 0.9)",
       
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        fontWeight: "500",
        
      },
      greytext1:{
        width: 105,
        height: 20,
        fontFamily: "Roboto-Medium",
        fontSize: 14,
        fontWeight: "500",
        color:'#4c4d4e',
        marginTop:49,
        
      },
     
      greytext2:{
        marginTop:22,
        
        fontFamily: "Roboto-Medium",
        fontSize: 13,
        fontWeight: "500",
        color: '#4c4d4e'
      },
      greytext3:{
        width: 312,
        height: 48,
        fontFamily: "Roboto-Medium",
        fontSize: 13,
        fontWeight: "500",
        color: '#4c4d4e',
      },
      circle:{
        width: 126,
        height: 126,
        borderRadius: 324.988,
        overflow: 'hidden',
        borderColor: 'lightgray',
        borderWidth: 1,
      },
      imageProfile:{
        alignItems:"center",
        width:'100%',
       //  height:400,
     //    borderWidth:2,
     //    borderColor:'red',
       // paddingHorizontal: 20,
       marginTop:15,
        
         },
      v1:{
        position:'absolute',
        top:94,
        left:25,
        width: 32,
        height: 32,
    
         },
      dp:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
     
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      subHeader: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
      },
      imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
      },
      imageSlot: {
        width: '30%',




        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#4c4d4e',
        borderWidth: 1,
        borderRadius: 10,  
        marginVertical: 5,
        backgroundColor: '#f7f7f7',  
      },
      bottomRow: {
        width: '30%', 
      },
      image: {
        width: '100%',
        height: '100%',
        borderRadius: 10, 
      },
      plusIcon: {
        fontSize: 24,
        color: '#ccc',
        fontWeight: 'bold',
      },
      noteText: {
        fontFamily: "Roboto-Medium",
        fontSize: 13,
        fontWeight: "500",
        color: '#4c4d4e',
        
        paddingHorizontal: 26,
        marginTop: 32,
      },
      

});