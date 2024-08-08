import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SliderImages from '../../components/SliderImages'; // Adjust the path as needed
import BodyParts from '../../components/bodyParts'; // Adjust the path as needed

const Exercise = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary" edges={['top']}>
      <View className="mx-5 mt-3">
        <Text className="text-[35px] font-psemibold tracking-wider text-gray-300">
          READY TO
        </Text>
        <Text className="text-[40px] font-pextrabold tracking-wider text-purple-600">
          WORKOUT
        </Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <SliderImages />
      </View>
      <View style={{ marginTop: 35, flex: 1 }}>
        <BodyParts />
      </View>
    </SafeAreaView>
  );
};

export default Exercise;
