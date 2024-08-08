import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import FormField from '../components/FormField';
import { moderateScale } from 'react-native-size-matters';

const NumericQuestion = ({ control, question, errors, onNext }) => {
  const validateNumber = (value) => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      return 'The value must be a number';
    }
    if (parsedValue <= 0) {
      return 'The value must be greater than 0';
    }
    return true;
  };

  const handleNext = (value) => {
    if (validateNumber(value) === true) {
      onNext({ [`question${question.id}`]: value });
    }
  };

  return (
    <Controller
      control={control}
      name={`question${question.id}`}
      rules={{
        required: 'This field is required',
        validate: validateNumber,
      }}
      render={({ field: { onChange, value } }) => (
        <View className="w-full">
          <FormField
            value={value || ''}
            placeholder="Your answer"
            handleChangeText={(text) => onChange(text)}
            keyboardType='numeric'
            otherStyles="mb-8 justify-center"
          />
          {errors[`question${question.id}`] && (
            <Text className="text-red-500 mt-2 font-psemibold">{errors[`question${question.id}`].message}</Text>
          )}
          <TouchableOpacity
            className="rounded-xl justify-center items-center text-center mt-5 bg-purple-700 shadow-md"
            style={{ width: '30%', height: moderateScale(40) }}
            onPress={() => handleNext(value)}
          >
            <Text className="text-lg text-white font-psemibold text-center">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default NumericQuestion;