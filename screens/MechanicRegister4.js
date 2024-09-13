import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,Text,TextInput,TouchableOpacity,Dimensions
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
import ImagePicker from 'react-native-image-crop-picker';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const MechanicRegister4 = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitude: 33.649985371588386,
     
    longitude: 73.15558404338307,
    latitudeDelta: 0.0014,
    longitudeDelta: 0.0014,
  });
  
  const [images, setImages] = useState([null, null, null]);
  const mapCustomStyle = [ { "elementType": "geometry", "stylers": [ { "color": "#242f3e" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#746855" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#242f3e" } ] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#263c3f" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#6b9a76" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#38414e" } ] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [ { "color": "#212a37" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#9ca5b3" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#746855" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#1f2835" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#f3d19c" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#2f3948" } ] }, { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [ { "color": "#d59563" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#17263c" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#515c6d" } ] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [ { "color": "#17263c" } ] } ]
  
  const [userInfo, setUserInfo] = useState({
    ...user,
    shopName:'',
    address:'',
   region:region,
   images:images
  });
  useEffect(() => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      region: region,
      images: images
    }));
  }, [region, images]);

  const handleChange = (name, value) => {
    setUserInfo(prevState => ({
      
      ...prevState,
      [name]: value
      
    }));
  };

    const renderImageSlots = () => {
        return images.map((img, index) => (
            <TouchableOpacity key={index} style={[styles.imageSlot, (index >= 3 && styles.bottomRow)]} onPress={() => selectImage(index)}>
                {img ? <Image source={img} style={styles.image} resizeMode="cover" /> : <Image source={ require('../assets/plus.png') } style={styles.image} resizeMode="cover" />}
            </TouchableOpacity>
        ));
    };
    const selectImage = (index) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: false
        }).then(image => {
            const source = { uri: image.path };
            const newImages = [...images];
            newImages[index] = source;
            setImages(newImages);
            console.log(userInfo);
        }).catch(error => {
            console.log('ImagePicker Error: ', error);
        });
    };
    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Image source={ require('../assets/Icon.png') }
                style={styles.back} />
                <Text style={styles.bText3}>Workshop Info</Text>

            </View>
            <Text style={styles.headerText}>Workshop Images</Text>
            <View style={styles.imageContainer}>
                {renderImageSlots()}
            </View>

      <Text style={[styles.headerText,{marginTop:10}]}>Chooose Location</Text>
      <MapView
        style={styles.map}
        customMapStyle= {mapCustomStyle}
        initialRegion={region}
        onRegionChangeComplete={region => setRegion(region)}
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
      </MapView>
        {/* <View style={{height:235,width:'100%',backgroundColor:'red'}}></View>       */}
        <Text style={[styles.headerText,{marginTop:10}]}>Details</Text>

                  
        <View style={[styles.pcontainer]}>
            <TextInput   onChangeText={(text) => handleChange('shopName', text)}
            value={userInfo.shopName} style={styles.pinput} placeholder="Enter Workshop Name" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            <View style={[styles.pcontainer,{marginTop:12}]}>
            <TextInput  onChangeText={(text) => handleChange('address', text)}
            value={userInfo.address}style={styles.pinput} placeholder="Enter Workshop Address" placeholderTextColor="rgba(0, 0, 0, 0.8)"/>
            </View>
            
          
           




            



      


            <TouchableOpacity onPress={() => navigation.navigate('MechanicRegister5', { user:userInfo })} style={styles.button}>
                <Text style={styles.buttonText1}>Done</Text>
            </TouchableOpacity>
           








        </View>
        );

};

export default MechanicRegister4;

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
        marginLeft:82,
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
        marginTop:22,
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
        
  headerText: {
    fontSize: 18,
    fontWeight: 'Roboto-Medium',
    fontSize: 22,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 28,
    letterSpacing: 0,
    textAlign: "center",
    marginTop: 31,
    marginBottom: 10,
    color:'#222730'
    
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 1
  },subHeader: {
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
  map: {
    width: screenWidth,
    height: 240,
  },  
});