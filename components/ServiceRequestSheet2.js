import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DarkButton from './DarkButton';
import firestore from '@react-native-firebase/firestore';

const { height } = Dimensions.get('window');

const ServiceRequestSheet2 = ({userId, requestData, onCancel}) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = [110, '22%'];

  const [problem, setProblem] = useState("My car broke down, I don't know what to do. The gearbox of my car is now loose. I guess its because of it.");
  const [voiceNoteAdded, setVoiceNoteAdded] = useState(false);
  const [sparePartsSelected, setSparePartsSelected] = useState(false);

  const [mechanicName, setMechanicName] = useState('Afzal Ali');
  const [mechanicPicture, setMechanicPicture] = useState(require('../assets/dp2.png')); // Local image reference
  const [mechanicRating, setMechanicRating] = useState('4.8');
  const [towing, setTowing] = useState(true);

  const [cost, setCost] = useState('1000');

  const isSparePartsSelected = sparePartsSelected;
  console.log("sdasd", userId.userId);
  console.log("sdasd", userId.userId);

  const handleCancel = async () => {
    Alert.alert(
      "Confirm Cancellation",
      "Do you really want to cancel this request?",
      [
        {
          text: "No",
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: async () => {
            try {
              const requestRef = firestore().collection('users').doc(userId).collection('requests').doc(requestData.requestId);
              await requestRef.delete();
              console.log("Request canceled successfully");
              onCancel();  // Notify parent to switch back the view
            } catch (error) {
              console.error("Error canceling request:", error);
              // Display an error message to the user
            }
          }
        }
      ]
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        handleComponent={null}
        backgroundStyle={styles.bottomSheetBackground} // Apply rounded corners to the bottom sheet
      >
        <View style={styles.header}>
          <View style={styles.headerIndicator} />
          <Text style={styles.headerText}>Finding mechanics...</Text>
        </View>
        
          <View style={styles.submitButtonGroup}>
            <DarkButton cancel={true} title="Cancel Request" onPress={handleCancel} />
          </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  topButtons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  headerText: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
    letterSpacing: 0,
    textAlign: "center",
    color: '#222730',
  },
  mechanicInfo: {
    alignItems: 'center',
    marginVertical: 16,
  },
  mechanicImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: 8,
  },
  mechanicName: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: '#222730',
  },
  mechanicRating: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: '#737475',
  },
  content: {
    alignItems: "center",
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    marginTop: 22,
  },
  inputGroup: {
    marginBottom: 15,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4C4D4E',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#000',
    fontFamily: 'Roboto-Medium',
    textAlignVertical: 'top',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchableButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4C4D4E',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 16,
    color: '#737475',
    fontFamily: 'Roboto-Bold',
    marginLeft: 10,
  },
  icon: {
    width: 36,
    height: 36,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 24,
  },
  chip: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, 
    marginRight: 10,
  },
  rchip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
    marginRight: 10,
    height: 23,
    position: 'absolute',
    left: 30,

  },
  chipIcon: {
    width: 24,
    height: 24,
    marginRight: 8, 
  },
  rchipIcon: {
    width: 14,
    height: 14,
    marginRight: 8, 
  },
  chipText: {
    fontSize: 14,
    color: '#49454F',
    fontFamily: 'Roboto-Bold',

  },
  submitButtonGroup: {
    marginTop: 10,
    alignItems: 'center',
  },
  headerIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginBottom: 8,
  },
  checkmark: {
    width: 25,
    height: 24,
    marginRight: 10,
  },
  noteText: {
    marginLeft: 24,
    marginRight: 24,
    fontFamily: "Roboto",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    textAlign: "left",
    color: '#4C4D4E',
  },
  bottomSheetBackground: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default ServiceRequestSheet2;
