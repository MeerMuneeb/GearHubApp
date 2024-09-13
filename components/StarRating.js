import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

const StarRating = ({ initialRating = 0, onRatingPress }) => {
    const [rating, setRating] = useState(initialRating);

    const handleRatingPress = (newRating) => {
        setRating(newRating);
        onRatingPress(newRating);
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            {[1, 2, 3, 4, 5].map((index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleRatingPress(index)}
                    activeOpacity={0.7}
                >
                    <Image
                        source={
                            index <= rating
                                ? require('../assets/star_filled.png')
                                : require('../assets/star_empty.png')
                        }
                        style={{ width: 30, height: 30, margin: 5 }}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default StarRating;
