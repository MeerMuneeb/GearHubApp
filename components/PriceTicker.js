import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

export default class PriceTicker extends Component {
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ScrollPicker
          dataSource={['1', '2', '3', '4', '5', '6']}
          selectedIndex={1}
          renderItem={(data, index) => (
            <Text style={{ fontSize: 18 }}>{data}</Text>
          )}
          onValueChange={(data, selectedIndex) => {
            console.log(`Selected value: ${data}, Index: ${selectedIndex}`);
          }}
          wrapperStyle={{
            height: 180,
            width: 150,
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#E5E5E5',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          itemHeight={60}
          highlightColor='#d8d8d8'
          highlightBorderWidth={2}
        />
      </View>
    );
  }
}
