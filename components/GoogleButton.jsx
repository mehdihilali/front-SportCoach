import icons from '../constants/icons'; // Adjust the path to your Google icon
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const GoogleButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-white rounded-xl min-h-[68px] flex-row justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={`text-black font-psemibold text-xl ${textStyles}`}>{title}</Text>
      <Image source={icons.google} style={{ width: 24, height: 24, marginLeft: 10 }} />
    </TouchableOpacity>
  );
};

export default GoogleButton;

