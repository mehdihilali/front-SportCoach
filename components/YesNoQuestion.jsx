import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Controller } from 'react-hook-form';

const YesNoQuestion = ({ control, question, errors, onNext }) => {
  const handleSelectOption = (onChange, option) => {
    onChange(option.value);
    onNext({ [`question${question.id}`]: option.value });
  };

  console.log("Question Data: ", question)

  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold mb-2">{question.text}</Text>
      <Controller
        control={control}
        name={`question${question.id}`}
        rules={{ required: 'This field is required' }}
        render={({ field: { onChange, value } }) => (
          <View className="w-full">
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`p-4 mb-4 rounded-lg shadow-lg flex-row items-center justify-between ${value === option.value ? 'bg-purple-100' : 'bg-white'}`}
                onPress={() => handleSelectOption(onChange, option)}
              >
                <Text className={`text-lg ${value === option.value ? 'text-purple-700 font-semibold' : 'text-gray-700'}`}>
                  {option.label}
                </Text>
                {option.image && (
                  <Image
                    source={option.image}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      {question.description && (
        <Text className="text-blue-800 mt-2">{question.description}</Text>
      )}
      {errors[`question${question.id}`] && (
        <Text className="text-red-500 mt-2 font-semibold">{errors[`question${question.id}`].message}</Text>
      )}
    </View>
  );
};

export default YesNoQuestion;