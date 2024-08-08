import React from 'react';
import { View, Text } from 'react-native';

const DividerWithText = ({ text }) => {
  return (
    <View className="flex-row items-center justify-center mt-6">
      <View className="w-1/4 h-[0.75px] bg-purple-400" />
      <Text className="mx-4 text-base text-purple-500">{text}</Text>
      <View className="w-1/4 h-[0.75px] bg-purple-400" />
    </View>
  );
};

export default DividerWithText;
