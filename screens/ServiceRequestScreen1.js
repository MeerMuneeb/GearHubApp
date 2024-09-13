import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ServiceRequestSheet from '../components/ServiceRequestSheet';
import 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import ServiceRequestSheet2 from '../components/ServiceRequestSheet2';

const screenWidth = Dimensions.get('window').width; // Get the screen width

const ServiceRequestScreen1 = ({ route }) => {
  // Assuming userId is passed to this screen as a parameter
  const { user } = route.params;
  console.log('userId', user.userId);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestData, setRequestData] = useState('');

  const handleSubmission = (data) => {    
    console.log("Data received from ServiceRequestSheet:", data);
    setRequestData(data);
    console.log("sss", data.Id);
    setRequestSubmitted(true);
  };

  const handleCancellation = () => {
    setRequestData(null);
    setRequestSubmitted(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.6844, // Default Latitude
          longitude: 73.0479, // Default Longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapCustomStyle}
        scrollEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}
      />
      <View style={styles.contentContainer}>
        {!requestSubmitted ?
          <ServiceRequestSheet userId={user.userId} onSubmit={handleSubmission} /> :
          <ServiceRequestSheet2 userId={user.userId} requestData={requestData} onCancel={handleCancellation} />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: screenWidth,
    height: '100%',
    position: 'absolute', 
    zIndex: 1, 
  },
  contentContainer: {
    flex: 1,
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

export default ServiceRequestScreen1;

// Custom Map Style
const mapCustomStyle = [ 
  { "elementType": "geometry", "stylers": [ { "color": "#242f3e" } ] }, 
  { "elementType": "labels.text.fill", "stylers": [ { "color": "#746855" } ] },
  { "elementType": "labels.text.stroke", "stylers": [ { "color": "#242f3e" } ] },
  // Include other style rules as required
];
