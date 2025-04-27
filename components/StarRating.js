import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

const StarRating = ({ rating }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(5)].map((_, index) => (
        <Icon
          key={index}
          name={index < rating ? 'star' : 'star-outline'}
          color={index < rating ? '#FFD700' : '#ccc'}
          size={20}
        />
      ))}
    </View>
  );
};

export default StarRating;