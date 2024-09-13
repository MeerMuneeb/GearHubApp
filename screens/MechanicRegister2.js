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

const MechanicRegister2 = ({route}) => {
  const navigation = useNavigation();
  const { email,role } = route.params;

    const [img,setImg] = React.useState('');
    const [user, setUser] = useState({
      phoneNumber:'',
      firstName: '',
      lastName: '',
      email: email,
      dpimg:img,
      role:role
    });
    
    const handleChange = (name, value) => {
      setUser(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 171,
          height: 171,
          cropping: true,
          compressImageQuality:0.7
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImg(image.path);
        });
      };
    return (
        <View style={styles.container}>
            <View style={styles.header} >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={ require('../assets/Icon.png') }
                style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.bText3}>Basic Info</Text>

            </View>
            <View style={styles.imageProfile}>
                <View style={styles.circle}  >
                  <Image 
                                      source={img ? { uri: img } : require('../assets/dp2.png')}

                    style={styles.dp}
                  />
                </View>
                <TouchableOpacity style={styles.pbutton} onPress={choosePhotoFromLibrary}>
                  <Text style={styles.pbuttontext}>Take a Photo</Text>
                  
      
                  </TouchableOpacity>
                  <Text style={styles.noteText}>
            <Text style={[styles.noteText,{fontFamily:"Roboto-Bold"}]}>Note:</Text>Take a Selfie. The Face should be clearly Visible.
            </Text>
            </View>
            <View style={[styles.pcontainer,{marginTop:19}]}>
            <TextInput  onChangeText={(text) => handleChange('firstName', text)}
            value={user.firstName} style={styles.pinput} placeholder="Enter First Name" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            <View style={styles.pcontainer}>
            <TextInput  onChangeText={(text) => handleChange('lastName', text)}
            value={user.lastName} style={styles.pinput} placeholder="Enter Last Name" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            
            <View style={styles.pcontainer}>
            <Image source={ require('../assets/pk.png') }
                style={{marginLeft:12}} />
            <TextInput  onChangeText={(text) => handleChange('phoneNumber', text)}
            value={user.phoneNumber} style={styles.pinput} placeholder="Phone Number" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            <View style={styles.pcontainer}>
            <TextInput  value={user.email}  editable={false}  style={styles.pinput} placeholder="Enter Your Email" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            











            <TouchableOpacity onPress={() => navigation.navigate('MechanicRegister3', { user })} style={styles.button}>
                <Text style={styles.buttonText1}>Done</Text>
            </TouchableOpacity>
           








        </View>
        );

};

export default MechanicRegister2;

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
        marginLeft:94,
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
        width: screenWidth * 0.87,

        height: 48,
        backgroundColor: '#222730',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:90
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
            
            paddingHorizontal: 26,
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
          
});