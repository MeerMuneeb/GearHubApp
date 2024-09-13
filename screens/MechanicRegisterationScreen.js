import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import StepButton from '../components/StepButton';
import DarkButton from '../components/DarkButton'; 

const MechanicRegistrationScreen = () => {
    const steps = [
        { id: 1, title: "Basic Info" },
        { id: 2, title: "CNIC" },
        { id: 3, title: "Workshop Info" },
        { id: 4, title: "Selfie with ID" },
        { id: 5, title: "Selfie in Workshop" }
    ];

    const [checkedSteps, setCheckedSteps] = useState([]);

    const handleSubmit = () => {
    };

    const handleStepPress = (stepId) => {
        setCheckedSteps(prev =>
            prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
        );
    };

    const isAllStepsCompleted = checkedSteps.length === steps.length;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity><Image source={require('../assets/Icon.png')} style={styles.back} /></TouchableOpacity>
                <Image source={require('../assets/Logo2.png')} style={styles.gearLogo} />
            </View>
            <Text style={styles.headingText}>Registration!</Text>

            {steps.map(step => (
                <StepButton
                    key={step.id}
                    title={step.title}
                    checked={checkedSteps.includes(step.id)}
                    onPress={() => handleStepPress(step.id)}
                />
            ))}

            <Text style={[styles.progressText, isAllStepsCompleted && styles.progressTextCompleted]}>
                {checkedSteps.length}/{steps.length} Steps Completed
            </Text>
            <Text style={styles.noteText}><Text style={styles.boldText}>Note: </Text>Complete all the steps to get access to the app. </Text>
            <View style={styles.footer}>
                <DarkButton title="Submit" onPress={handleSubmit} disabled={!isAllStepsCompleted} />
            </View>
        </View>
    );
};

export default MechanicRegistrationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header: {
        marginTop: 43,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    back: {
        marginLeft: 20,
    },
    gearLogo: {
        width: 118,
        height: 38,
        marginLeft: 87,
    },
    headingText: {
        fontFamily: "Roboto-Bold",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 41,
        lineHeight: 32,
        letterSpacing: 0,
        textAlign: "center",
        color: '#222730'
    },
    footer: {
        position: 'absolute',
        bottom: 26,
        width: '100%',
        alignItems: 'center',
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
        marginTop: 12,
    },
    boldText: {
        fontWeight: 'bold',
    },
    progressText: {
        flexDirection: 'column',
        fontFamily: "Roboto",
        fontSize: 16,
        marginTop: 15,
        lineHeight: 16,
        letterSpacing: 0.5,
        textAlign: "right",
        color: '#520E12',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginRight: 24,
    },
    progressTextCompleted: {
        color: '#1E4C24',
    },
});
