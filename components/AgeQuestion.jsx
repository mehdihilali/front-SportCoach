import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Controller } from 'react-hook-form';

const ageOptions = [
  { label: '18-25', value: '18-25', image: require('../assets/ages/age1.png') },
  { label: '26-35', value: '26-35', image: require('../assets/ages/age2.png') },
  { label: '36-45', value: '36-45', image: require('../assets/ages/age4.png') },
  { label: '46+', value: '46+', image: require('../assets/ages/age3.png') },
];

const AgeQuestion = ({ control, question, errors, onNext }) => {
  return (
    <Controller
      control={control}
      name={`question${question.id}`}
      render={({ field: { onChange, value } }) => (
        <View className="flex-row justify-between flex-wrap">
          {ageOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              className={`w-[48%] mb-4 items-center rounded-xl overflow-hidden ${
                value === option.value ? 'border-1 border-purple-600' : 'border-0'
              }`}
              onPress={() => {
                onChange(option.value);
                onNext({ [`question${question.id}`]: option.value });
              }}
            >
              <View className="w-full rounded-lg overflow-hidden bg-gray-200 mb-5">
                <Image
                  source={option.image}
                  className="w-full h-[150px] rounded-t-lg"
                  resizeMode="cover"
                />
                <View className="w-full bg-purple-500 py-2">
                  <Text className="text-center text-white font-semibold">
                    {option.label}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      rules={{ required: 'Ce champ est requis' }}
    />
  );
};

export default AgeQuestion;