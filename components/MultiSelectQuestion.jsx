import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import { moderateScale } from 'react-native-size-matters';

const MultiSelectQuestion = ({ control, question, errors, onNext }) => {
  const handleNext = (value) => {
    onNext({ [`question${question.id}`]: value });
  };

  return (
    <Controller
      control={control}
      rules={{ required: 'Please select at least one option.' }}
      render={({ field: { onChange, value } }) => (
        <View className="w-full mb-4">
          <View className="w-full">
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`p-4 mb-4 rounded-lg shadow-lg flex-row items-center justify-between ${value?.includes(option.value) ? 'bg-purple-300' : 'bg-white'}`}
                onPress={() => {
                  const newValue = value?.includes(option.value)
                    ? value.filter(item => item !== option.value)
                    : [...(value || []), option.value];
                  onChange(newValue);
                }}
              >
                <Text className={`text-lg text-center ${value?.includes(option.value) ? 'text-purple-800 font-semibold' : 'text-gray-700'}`}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {question.description && (
            <View className="mt-5 p-3 bg-blue-200 rounded-lg">
              <Text className="text-blue-800">
                {question.description}
              </Text>
            </View>
          )}
          {errors[`question${question.id}`] && (
            <Text className="text-red-500 mt-2 font-psemibold">{errors[`question${question.id}`].message}</Text>
          )}
          <TouchableOpacity
            className="rounded-xl justify-center items-center text-center mt-6 bg-purple-700 shadow-md"
            style={{ width: '35%', height: moderateScale(40) }}
            onPress={() => handleNext(value)}
          >
            <Text className="text-lg text-white font-psemibold text-center">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
      name={`question${question.id}`}
    />
  );
};

export default MultiSelectQuestion;