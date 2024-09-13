import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen1 from './screens/LoginScreen1';
import LoginScreen2 from './screens/LoginScreen2';
import JoinAsScreen from './screens/JoinAsScreen';
import VerificationScreen from './screens/VerificationScreen';
import UserAddInfoScreen1 from './screens/UserAddInfoScreen1';
import UserAddInfoScreen2 from './screens/UserAddInfoScreen2';
import UserAddInfoScreen3 from './screens/UserAddInfoScreen3';
import MechanicRegister2 from './screens/MechanicRegister2';
import MechanicRegister3 from './screens/MechanicRegister3';
import MechanicRegister4 from './screens/MechanicRegister4';
import MechanicRegister5 from './screens/MechanicRegister5';
import MechanicRegister6 from './screens/MechanicRegister6';
import MechanicRegister7 from './screens/MechanicRegister7';
import SuccessScreen from './screens/SuccessScreen';
import ServiceRequestScreen1 from './screens/ServiceRequestScreen1';
import BidScreen1 from './screens/BidScreen1';
const Stack = createNativeStackNavigator();



const ProfileStack = () => {
    return (
      
      <Stack.Navigator>
       
       
       
       
     
      
      
       {/* <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      /> */}


{/*         
<Stack.Screen
        name="LoginScreen2"
        component={LoginScreen2}
        options={{headerShown: false}}
      /> */}
         <Stack.Screen
        name="JoinAsScreen"
        component={JoinAsScreen}
        options={{headerShown: false}}
      />
         
        <Stack.Screen
        name="LoginScreen1"
        component={LoginScreen1}
        options={{headerShown: false}}
      />
      
        {/* <Stack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
        options={{headerShown: false}}
      /> */}

        {/* <Stack.Screen
        name="UserAddInfoScreen1"
        component={UserAddInfoScreen1}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="UserAddInfoScreen2"
        component={UserAddInfoScreen2}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="UserAddInfoScreen3"
        component={UserAddInfoScreen3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ServiceRequestScreen1"
        component={ServiceRequestScreen1}
        options={{headerShown: false}}
      />

        <Stack.Screen
        name="MechanicRegister2"
        component={MechanicRegister2}
        options={{headerShown: false}}
      />
         <Stack.Screen
        name="MechanicRegister3"
        component={MechanicRegister3}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="MechanicRegister4"
        component={MechanicRegister4}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="MechanicRegister5"
        component={MechanicRegister5}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="MechanicRegister6"
        component={MechanicRegister6}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="MechanicRegister7"
        component={MechanicRegister7}
        options={{headerShown: false}}
      />
      <Stack.Screen
      name="BidScreen1"
      component={BidScreen1}
      options={{headerShown: false}}
    /> */}
      {/* <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      /> */}
        {/* <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />

        <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      /> */}

      
{/* <Stack.Screen name="ProfileTab" component={HomeTab} options={{ headerShown: false }}/> */}

      
      
 
      </Stack.Navigator>
    );
  }


export default function App() {
    return (
      <NavigationContainer>
        <ProfileStack />
      </NavigationContainer>
    );
  }