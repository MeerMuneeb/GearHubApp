import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DarkButton from './DarkButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const { height } = Dimensions.get('window');

const ServiceRequestSheet = ({ userId, onSubmit }) => {
  console.log("sdsd", userId);
  const bottomSheetRef = useRef(null);
  const snapPoints = [100, '67%'];

  const [problem, setProblem] = useState('');
  const [voiceNoteAdded, setVoiceNoteAdded] = useState(false);
  const [sparePartsSelected, setSparePartsSelected] = useState(false);

  const isProblemFilled = problem.trim().length > 0;
  const isVoiceNoteAdded = voiceNoteAdded;
  const isSparePartsSelected = sparePartsSelected;

  const handleSubmit = async () => {
    if (!userId) {
      console.error("No userId provided");
      return;
    }
  
    const requestData = {
      problem,
      voiceNoteAdded,
      sparePartsSelected,
    };
    
    console.log("zzz",requestData);
  
    try {
      const requestRef = firestore().collection('users').doc(userId).collection('requests').doc();
      const requestId = requestRef.id;
      console.log("zzz",requestData);
      const UrequestData = {
        ...requestData,   // Spread the existing requestData
        requestId // Add the requestId to the requestData
    };
      await requestRef.set(UrequestData);
      console.log("sssddd", UrequestData);
      console.log("Request submitted successfully", UrequestData.requestId);
      onSubmit(UrequestData);  // Pass requestData back to the parent component
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        handleComponent={null}
      >
        <View style={styles.header}>
          <View style={styles.headerIndicator} />
          <Text style={styles.headerText}>Find your service right away!</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <View style={styles.row}>
              <Image
                source={isProblemFilled ? require('../assets/checkmark.png') : require('../assets/checkmarkempty.png')}
                style={styles.checkmark}
              />
              <TextInput
                style={[styles.input, { height: 150 }]}
                placeholder="Write your problem..."
                placeholderTextColor="#737475"
                multiline={true}
                value={problem}
                onChangeText={setProblem}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <View style={styles.row}>
              <Image
                source={isVoiceNoteAdded ? require('../assets/checkmark.png') : require('../assets/checkmarkempty.png')}
                style={styles.checkmark}
              />
              <TouchableOpacity
                style={styles.touchableButton}
                onPress={() => setVoiceNoteAdded(!voiceNoteAdded)}
              >
                <Text style={styles.buttonText}>Add Voice Note...</Text>
                <Image source={require('../assets/mic.png')} style={styles.icon} />
              </TouchableOpacity>
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
                <Image source={require('../assets/settings.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.submitButtonGroup}>
            <DarkButton title="Submit Request" onPress={handleSubmit} />
          </View>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
  content: {
    alignItems: "center",
    backgroundColor: '#fff',
    padding: 24,
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
    fontSize: 16,
    color: '#000',
    fontFamily: 'Roboto-Bold',
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
  submitButtonGroup: {
    marginTop: 10,
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
});

export default ServiceRequestSheet;
