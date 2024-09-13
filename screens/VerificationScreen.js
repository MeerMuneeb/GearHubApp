import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,Text,TextInput,TouchableOpacity,Dimensions,Alert
} from 'react-native';
import { OtpInput } from "react-native-otp-entry";
import { useNavigation } from '@react-navigation/native';

const VerificationScreen = ({ route }) => {
  const { confirmation, joinAs ,phoneNumber} = route.params;  
  const navigation = useNavigation();

    const [code, setCode] = useState('');
    const handleSignIn = async () => {
      try {
        console.log(code);
        
        const response = await confirmation.confirm(code);
        console.log('?');
        const userRef = firestore().collection('users').doc(response.user.uid);
  
        userRef.get().then((doc) => {
          if (doc.exists) {
            // navigation.navigate('ServiceRequest');
            console.log("USER EXISTS ALREADY")
          } else {
            navigation.navigate('UserAddInfoScreen1', { uid: response.user.uid, phoneNumber: phoneNumber, joinAs: joinAs });
          }
        });
      } catch (error) {
        Alert.alert('Invalid code', 'The code you entered is not valid.');
      }
    };
    return (
        <View style={styles.container}>
            <View style={styles.header} >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={ require('../assets/Icon.png') }
                style={styles.back} />
                </TouchableOpacity>
                <Image source={ require('../assets/Logo2.png') }
                style={styles.gearLogo} />
            </View>
            <Text style={styles.bText1}>Enter the code</Text>
            <Text style={styles.bText2}>We have sent you a verification code to</Text>
            <Text style={styles.bText2}>{phoneNumber}</Text>
            
            <OtpInput
              numberOfDigits={6}
              focusColor="#4c4d4e"
              focusStickBlinkingDuration={500}
              onTextChange={(text) => console.log(text)}
              onFilled={(text) => setCode(text)}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: styles.otpcontainer,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: styles.focusStick,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              }}
            />
            <TouchableOpacity onPress={() => handleSignIn()} style={styles.button}>
                <Text style={styles.buttonText1}>Submit</Text>
            </TouchableOpacity>
            <Text style={styles.greytext1}>Didn’t recieve it?</Text>

            <TouchableOpacity onPress={() => handleGoogleSignIn()} style={styles.gbutton}>
                
                <Text style={styles.gbuttonText1}>Resend Code</Text>
            </TouchableOpacity>
            









        </View>
        );

};

export default VerificationScreen;

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
        marginTop:49,
        lineHeight: 32,
        letterSpacing: 0,
        textAlign: "center",  
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
      width:'75%'
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
    pcontainer:{
        width: 312,
        height: 48,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: 10,
        flexDirection:'row',
        alignItems:'center',
        marginTop:39,
     
        justifyContent:'flex-start'
    },
    pinput:{
        fontFamily: "Roboto-Medium",
        fontSize: 15,
        marginLeft:14,
    },
    button: {
        width: 312,
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
      gbutton: {
        width: 312,
        height: 48,
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        borderRadius: 10,
        alignItems: 'center',
        marginTop:26,
        borderColor: "rgba(0, 0, 0, 0.4)",
        borderStyle: "solid",
        borderWidth: 1,
        flexDirection:'row',
        justifyContent:'center'
      },
      gbuttonText1: {
        textAlign: "left",
        color: "rgba(0, 0, 0, 0.6)",
        fontSize: 16,
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        fontWeight: "500",
  
      },
      glogo:{
        marginLeft:8,
        marginRight:56
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
      }
      
      
});