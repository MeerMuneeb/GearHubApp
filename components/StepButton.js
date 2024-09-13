import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const StepButton = ({ title, checked, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Image 
                    source={checked ? require('../assets/checkmark.png') : require('../assets/checkmarkempty.png')} 
                    style={styles.icon} 
                />
            </View>
            <Text style={[styles.title, checked && styles.checkedTitle]}>{title}</Text>
            <View style={styles.arrowContainer}>
                <Image source={require('../assets/arrow.png')} style={styles.arrow} />
            </View>
        </TouchableOpacity>
    );
};

export default StepButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4C4D4E',
        borderRadius: 10,
        padding: 10,
        marginTop: 15,
        marginHorizontal: 24,
        height: 56,
    },
    iconContainer: {
        width: 30,
        height: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 24,
    },
    title: {
        flex: 1,
        marginLeft: 24,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
        textAlign: "left",  
        color:'#1D1B20',
        fontWeight: 'bold',
    },
    checkedTitle: {
        color: '#1E4C24',
    },
    arrowContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        width: 8,
        height: 12,
    },
});
