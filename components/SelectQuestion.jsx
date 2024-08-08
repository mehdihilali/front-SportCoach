import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Controller } from 'react-hook-form';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

const SelectQuestion = ({ control, question, errors, onNext }) => {
  const handleSelectOption = (onChange, option) => {
    onChange(option.value);
    onNext({ [`question${question.id}`]: option.value });
  };

  return (
    <View style={{ width: '100%', marginBottom: verticalScale(10) }}>
      <Controller
        control={control}
        name={`question${question.id}`}
        rules={{ required: 'This field is required' }}
        render={({ field: { onChange, value } }) => (
          <>
            <View style={{ width: '100%' }}>
              {question.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    padding: moderateScale(10),
                    marginBottom: verticalScale(10),
                    borderRadius: moderateScale(5),
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: verticalScale(1) },
                    shadowOpacity: 0.8,
                    shadowRadius: moderateScale(1),
                    elevation: 3,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: value === option.value ? '#D1C4E9' : '#FFF',
                  }}
                  onPress={() => handleSelectOption(onChange, option)}
                >
                  <Text style={{
                    fontSize: moderateScale(14),
                    textAlign: 'center',
                    color: value === option.value ? '#6A1B9A' : '#4A4A4A',
                    fontWeight: value === option.value ? 'bold' : 'normal',
                  }}>
                    {option.label}
                  </Text>
                  {option.image && (
                    <Image
                      source={option.image}
                      style={{ width: moderateScale(40), height: moderateScale(40) }}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            {question.description && (
              <View style={{
                marginTop: verticalScale(14),
                padding: moderateScale(8),
                backgroundColor: '#BBDEFB',
                borderRadius: moderateScale(5),
              }}>
                <Text style={{ color: '#1E88E5' }}>
                  {question.description}
                </Text>
              </View>
            )}
            {errors[`question${question.id}`] && (
              <Text style={{ color: '#E57373', marginTop: verticalScale(5), fontWeight: 'bold' }}>
                {errors[`question${question.id}`].message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default SelectQuestion;