// components/ClickableCard.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

const ClickableCard = ({ title, image, icon, date, onPress }) => {
  return (
    <Animatable.View animation="fadeInUp" className="rounded-xl overflow-hidden shadow-lg mx-2 mb-4 bg-white">
      <TouchableOpacity onPress={onPress} className="relative w-full h-48">
        <ImageBackground source={image} className="w-full h-full">
          <View className="absolute inset-0 bg-black bg-opacity-50 rounded-xl" />
          <View className="absolute top-2 left-2 bg-purple-300 p-2 rounded-full">
            <Image source={icon} className="w-8 h-8" resizeMode='contain' />
          </View>
          <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-b-xl">
            <Text className="text-gray-100 text-sm mb-1">{date}</Text>
            <Text className="text-purple-600 text-lg font-bold">{title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default ClickableCard;
