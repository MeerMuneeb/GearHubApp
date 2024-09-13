import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const DarkButton = ({ title, onPress, disabled, cancel }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, disabled && styles.buttonDisabled]}
            disabled={disabled}
        >
            <Text style={[styles.buttonText, cancel && { color: '#FF9A9A' }]}>{title}</Text>
        </TouchableOpacity>
    );
};


export default DarkButton;

const styles = StyleSheet.create({
    button: {
        width: 312,
        height: 48,
        backgroundColor: '#222730',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#737475',
    },
    buttonText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        fontWeight: '500',
    },
});
