import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DarkButton from './DarkButton';
import PriceTicker from './PriceTicker';
import firestore from '@react-native-firebase/firestore';
const { height } = Dimensions.get('window');
import { collection, query, where, getDocs } from "firebase/firestore";

const fetchAllRequests = async () => {
  try {
    // Fetching all requests from the collection group
    const usersSnapshot = await firestore().collectionGroup('requests').get();

    const requests = usersSnapshot.docs.map(doc => ({
      ...doc.data(),
      requestId: doc.id,
      ownerId: doc.ref.parent.parent.id // Gets the user ID (owner of the request)
    }));

    console.log(requests);
    return requests;
  } catch (error) {
    console.error("Error fetching requests from Firestore:", error);
  }
};

const BidSheet = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = [110, '54%'];

  const [problem, setProblem] = useState("My car broke down, I don't know what to do. The gearbox of my car is now loose. I guess its because of it.");
  const [voiceNoteAdded, setVoiceNoteAdded] = useState(false);
  const [sparePartsSelected, setSparePartsSelected] = useState(false);

  const [vehicleName, setVehicleName] = useState('Toyota Corrola');
  const [vehicleYear, setVehicleYear] = useState('2018');
  const [ownerPicture, setOwnerPicture] = useState(require('../assets/dp2.png')); 
  const [towing, setTowing] = useState(true);

  const [cost, setCost] = useState('1000');
  const [requests, setRequests] = useState([]);

  const isSparePartsSelected = sparePartsSelected;

  const handleSelectPrice = (price) => {
    setCost(price);
  };

  useEffect(() => {
    fetchAllRequests().then(fetchedRequests => {
      setRequests(fetchedRequests);
    });
  }, []);


  

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
          <View style={styles.topHeader}>
            <View style={{ flexDirection: 'row' }}>              
              <Image source={ownerPicture} style={styles.ownerImage} /> 
              <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
                <Text style={styles.headerText}>{vehicleName}</Text>    
                <Text style={styles.ownerName}>{vehicleYear}</Text>   
              </View>
            </View>
            <TouchableOpacity>
              <Image source={require('../assets/mic2.png')} />
            </TouchableOpacity>    
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { height: 80 }]}
                multiline={true}
                value={problem}
                onChangeText={setProblem}
                editable={false}
              />
            </View>
          </View>     
          <View style={styles.inputGroup}>
            <View style={styles.row}>
              <Image
                source={isSparePartsSelected ? require('../assets/checkmark.png') : require('../assets/checkmarkempty.png')}
                style={styles.checkmark}
              />
              <TouchableOpacity
                style={styles.touchableButton}
                onPress={() => setSparePartsSelected(!sparePartsSelected)}
              >
                <Text style={styles.buttonText}>Select spare parts <Text style={styles.noteText}>(optional)</Text></Text>
                <Image source={require('../assets/settings2.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>            
          </View>
          <View style={styles.inputGroup}>
            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxLabel}>TOW VEHICLE</Text>
              <TouchableOpacity
                onPress={() => setTowing(!towing)}
                style={[styles.checkbox, towing && styles.checkboxChecked]}
              >
                {towing && <View style={styles.checkboxInner} />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
          <View style={styles.submitButtonGroup}>
            <DarkButton title="Bid" onPress={() => {}} />
          </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  topHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginHorizontal: 24,
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
  ownerImage: {
    width: 70,
    height: 70,
  },
  ownerName: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: '#222730',
    marginTop: -3,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#49454F',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  checkboxChecked: {
    backgroundColor: '#fff',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: '#49454F',
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#222730',
    fontFamily: 'Roboto-Black',
  },
  
});

export default BidSheet;
