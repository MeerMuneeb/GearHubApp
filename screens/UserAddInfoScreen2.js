import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,Text,TextInput,TouchableOpacity,Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const UserAddInfoScreen2 = ({ route }) => {
  const { user } = route.params;
  
  console.log(user);
  const navigation = useNavigation();

  
  const [userInfo, setUserInfo] = useState({
    ...user,
    regNo: '',
    make: '',
    model: '',
    color: '',
    year: '',
    vehicleType: ''
  });

  const handleChange = (name, value) => {
    setUserInfo(prevState => ({
      
      ...prevState,
      [name]: value
      
    }));
  };

  // Update vehicleType separately as it comes from Picker
  const handleTypeChange = (value) => {
    setUserInfo(prevState => ({
      ...prevState,
      vehicleType: value
    }));
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
            <Text style={[styles.bText1,{marginLeft:100}]}>Add your Vehicle!</Text>
            
            <Text style={[styles.bText1,{marginTop:38}]}>Reg No.</Text>
            <View style={styles.pcontainer}>
            <TextInput      onChangeText={(text) => handleChange('regNo', text)}
            value={userInfo.regNo} style={styles.pinput} placeholder="Enter Reg No.*" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            <Text style={[styles.bText1,{marginTop:25}]}>Vehicle</Text>
            <View style={styles.linecontainer}>
            <View style={styles.vcontainer}>
            <TextInput        onChangeText={(text) => handleChange('make', text)}
                  value={userInfo.make}                  style={styles.vinput} placeholder="Make" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            <View style={[styles.vcontainer,{marginLeft:10}]}>
            <TextInput        onChangeText={(text) => handleChange('model', text)}
            value={userInfo.model} style={styles.vinput} placeholder="Model" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            </View>
            <View style={[styles.linecontainer,{marginTop:4}]}>
            <View style={[styles.vcontainer,{width:screenWidth * 0.61}]}>
            <TextInput  onChangeText={(text) => handleChange('color', text)}
             value={userInfo.color} style={styles.vinput} placeholder="Enter Color" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            <View style={[styles.vcontainer,{marginLeft:10,width: screenWidth *0.23}]}>
            <TextInput  onChangeText={(text) => handleChange('year', text)}
            value={userInfo.year} style={styles.vinput} placeholder="Year" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            </View>
            <Text style={[styles.bText1,{marginTop:25}]}>Type</Text>
            <View style={styles.pickerContainer}>
            <Picker
              selectedValue={userInfo.vehicleType}
              onValueChange={(itemValue, itemIndex) => handleTypeChange(itemValue)}
              style={styles.picker}
              mode="dropdown">
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Sedan" value="sedan" />
              <Picker.Item label="SUV" value="suv" />
              <Picker.Item label="Hatchback" value="hatchback" />
              <Picker.Item label="Convertible" value="convertible" />
            </Picker>
        </View>
            
            
            











            <TouchableOpacity onPress={() => navigation.navigate('UserAddInfoScreen3', { user:userInfo })} style={styles.button}>
                <Text style={styles.buttonText1}>Next</Text>
            </TouchableOpacity>
           








        </View>
        );

};

export default UserAddInfoScreen2;

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
      pcontainer:{
        width: screenWidth * 0.87,
        height: 45,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: 10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop:10
        },
      vcontainer:{
        width: screenWidth * 0.42,
        height: 45,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: 10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop:10
      },
      pinput:{
        fontFamily: "Roboto-Medium",
        fontSize: 14,
        marginLeft:14,
        flex: 1, 
        color: "rgba(0, 0, 0, 0.7)"
        },
      vinput:{
        fontFamily: "Roboto-Medium",
        fontSize: 14,
        textAlign:'center',
        flex: 1, 
        color: "rgba(0, 0, 0, 0.7)"
        },
      linecontainer:{
        width:screenWidth * 0.87,
        flexDirection:'row'
      },
      pickerContainer: {
        width: screenWidth * 0.87,
        height: 45,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: 10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop:10
    },
    picker: {
        fontFamily: "Roboto-Medium",
        fontSize: 14,
        textAlign:'center',
        flex: 1, 
        color: "rgba(0, 0, 0, 0.7)",
        width:'100%'
    },


});