import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,Text,TextInput,TouchableOpacity,Dimensions, Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const LoginScreen2 = () => {
  const [showPassword, setShowPassword] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = React.useState('');
const [pass, setPass] = React.useState('');
    const navigation = useNavigation();

  
  // useEffect(() => {
  //   AsyncStorage.getItem("user_id").then(res => navigation.navigate("ProfileTab"))},[]);



  const handleSignIn = async () => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in:', user)
        console.log('here')
        setEmail('');
        setPass('');
        // navigation.navigate('ProfileTab')

        try {
          AsyncStorage.setItem("user_id", user.uid)
            .then(response => console.log("User ID saved"))


        }
        catch (e) {
          console.log(e)
        }

      })
      .catch((error) => {
        // Handle sign-in errors
        console.error('Error signing in:', error);
        // Display error message or handle accordingly
});
}

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
            <Text style={styles.bText1}>Login</Text>
            <View style={[styles.pcontainer,{marginTop:27}]}>
            <TextInput  onChangeText={setEmail}
          value={email} style={styles.pinput} placeholder="Enter Email" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            <View style={[styles.pcontainer,{marginTop:15}]}>
            <TextInput  onChangeText={setPass}
            value={pass} style={styles.pinput} secureTextEntry={!showPassword} placeholder="Enter Password" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            <View style={styles.existingAccount}>
            <Text style={styles.textExistingAcc}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
            <TouchableOpacity onPress={() => handleSignUp()} style={styles.button}>
                <Text style={styles.buttonText1}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.greytext1}>Or login with</Text>

            <TouchableOpacity onPress={() => handleGoogleSignIn()} style={styles.gbutton}>
                <Image source={ require('../assets/google.png') }
                    style={styles.glogo} />
                <Text style={styles.gbuttonText1}>Login with Google</Text>
            </TouchableOpacity>
            <Text style={styles.greytext2}>Joining our app means you agree with our <Text style={{textDecorationLine:'underline'}}>Terms of</Text></Text>
            {/* <Text style={styles.greytext3}><Text style={{textDecorationLine:'underline'}}>Use</Text> and <Text style={{textDecorationLine:'underline'}}>Privacy Policy</Text></Text> */}
            <Text style={[styles.greytext2,{marginTop:0}]}><Text style={{textDecorationLine:'underline'}}>Use</Text> and <Text style={{textDecorationLine:'underline'}}>Privacy Policy</Text> </Text>











        </View>
        );

};

export default LoginScreen2;

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
        fontFamily: "Roboto",
        fontSize: 24,
        fontWeight: "bold",
        marginTop:108,
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
        color: 'black',
    },
    button: {
        width: 312,
        height: 48,
        backgroundColor: '#222730',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop:22,
        marginBottom:22
      },
      buttonText1: {
        textAlign: "left",
        color: "rgba(255, 255, 255, 0.9)",
       
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        fontWeight: "500",
  
      },
      greytext1:{
        fontFamily: "Roboto-Medium",
        fontSize: 14,
        fontWeight: "500",
        color:'#4c4d4e'
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
        justifyContent:'flex-start'
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
      ,
  existingAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:30,
    marginBottom: 10,
    color: '#FFF'
  },
  textExistingAcc: {
    color: '#4c4d4e',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
  
  loginText: {
    marginLeft: 5,
    color: 'dark-blue',
        fontFamily: 'Roboto-Bold',
        fontWeight:'700'
  },
});