import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,Text,TextInput,TouchableOpacity,Dimensions
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';
const MechanicRegister6 = ({ route }) => {
    const [frontImage, setFrontImage] = useState(null); // State for the front side of CNIC
    const { user } = route.params;
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({
      ...user,
      selfieWithWorkshop:frontImage
    });
    
    useEffect(() => {
      setUserInfo(prevState => ({
        ...prevState,
        selfieWithWorkshop: frontImage,
        
      }));
    }, [frontImage]);

    const registerProfile = async () => {
      try {
        const userIdd = await AsyncStorage.getItem('user_id');
        console.log("id reveiced in registerprofile")
        console.log(user)
        await firestore().collection('users').doc(userIdd).set({
          
          phoneNumber:user.phoneNumber,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dpimg:user.dpimg,
          frontImage:user.frontImage,
          backImage:user.backImage,
          region:user.region,
          images:user.images,
          selfieWithId:user.selfieWithId,
          selfieWithWorkshop:frontImage,
          userId:userIdd,
          role:user.role

         
        });
    
    
        ToastAndroid.showWithGravityAndOffset(
          'Registered Successfully!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        console.log('Registered successfully');
        navigation.navigate('MechanicRegister7', { user: userInfo });
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };

    const selectImage = (side) => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          const imageUri = image.path; // Get image path from image picker response
          if (side === 'front') {
            setFrontImage(imageUri);
          } else {
            setBackImage(imageUri);
          }
          console.log(userInfo);

        }).catch(error => {
          console.log('ImagePicker Error:', error);
        });
      };
    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Image source={ require('../assets/Icon.png') }
                style={styles.back} />
                <Text style={styles.bText3}>Workplace Confirmation</Text>

            </View>
      <View style={styles.imageContainer}>
        <Image source={frontImage ? { uri: frontImage } : require('../assets/defaultsquare.png')} style={styles.image} />
        <TouchableOpacity style={styles.pbutton} onPress={() => selectImage('front')}>
                  <Text style={styles.pbuttontext}>Take a Photo</Text>
                  
      
                  </TouchableOpacity>
                  <Text style={styles.noteText}>
            <Text style={[styles.noteText,{fontFamily:"Roboto-Bold"}]}>Note:</Text>The Workshop Sign Board and your Face should be clearly visible.
.
            </Text>
      </View>

                
                
                
                  
          
          
           











            <TouchableOpacity onPress={() => registerProfile()} style={styles.button}>
                <Text style={styles.buttonText1}>Done</Text>
            </TouchableOpacity>
           








        </View>
        );

};

export default MechanicRegister6;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      },

    header:{
        marginTop:28,
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
        textAlign: "center",  
        color:'#222730'
    },
    bText3:{
        // width: 285,
        // height: 32,
        fontFamily: "Roboto-Bold",
        fontSize: 24,
        fontWeight: "bold",
        marginLeft:30,
        lineHeight: 32,
        letterSpacing: 0,
        color:'#222730'
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
    
    button: {
        width: screenWidth * 0.87,
        marginTop: 270,
        height: 48,
        backgroundColor: '#222730',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        
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
        width: 171.5,
        height: 171.5,
        borderRadius: 325,
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
      pcontainer:{
        width: screenWidth * 0.87,

        height: 48,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: 10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop:20
        },
      pinput:{
        fontFamily: "Roboto-Medium",
        fontSize: 14,
        marginLeft:14,
        flex: 1, 
        color: "black"
        },
        pbutton:{
            marginTop:13,
             width: screenWidth * 0.4,
            height: 38,
            borderRadius: 10,
            backgroundColor: "#d9d9d9",
            alignItems:'center',
            justifyContent:'center'
        },
        noteText: {
            fontFamily: "Roboto-Medium",
            fontSize: 13,
            fontWeight: "500",
            color: '#4c4d4e',
            
            paddingHorizontal: 41,
            marginTop: 30,
          },
          
        pbuttontext:{
            // width: 95,
            height: 24,
            fontFamily: "Roboto-Medium",
            fontSize: 16,
            fontWeight: "500",
            fontStyle: "normal",
            lineHeight: 24,
            letterSpacing: 0.15,
            textAlign: "center",
            color:'#222730'
        },
        
  headerText: {
    fontSize: 18,
    fontWeight: 'Roboto-Medium',
    fontSize: 22,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 28,
    letterSpacing: 0,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    color:'#222730'
    
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop:35,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderColor: '#ccc', // Changed to a lighter color
    borderWidth: 1,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 3, // Shadow blur radius
    elevation: 3, // For Android elevation shadow
  },
          
});