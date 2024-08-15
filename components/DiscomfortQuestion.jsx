import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const DiscomfortQuestion = ({ control, question, errors, onNext }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectOption = (onChange, option) => {
    let updatedSelectedOptions;
    if (selectedOptions.includes(option.value)) {
      updatedSelectedOptions = selectedOptions.filter(item => item !== option.value);
    } else {
      updatedSelectedOptions = [...selectedOptions, option.value];
    }
    setSelectedOptions(updatedSelectedOptions);
    onChange(updatedSelectedOptions);
  };

  const options = [
    { label: 'Shoulder', value: 'shoulder', top: 70, left: 150, labelTop: 58, labelLeft: 190 },
    { label: 'Elbow', value: 'elbow', top: 130, left: 30, labelTop: 120, labelLeft: -30 },
    { label: 'Back', value: 'back', top: 150, left: 130, labelTop: 140, labelLeft: 170 },
    { label: 'Hip', value: 'hip', top: 240, left: 75, labelTop: 230, labelLeft: 28 },
    { label: 'Knee', value: 'knee', top: 285, left: 137, labelTop: 275, labelLeft: 175 },
    { label: 'Foot & Ankle', value: 'foot_ankle', top: 380, left: 80, labelTop: 360, labelLeft: -15 },
  ];

  const handleFinish = () => {
    onNext({ [`question${question.id}`]: selectedOptions });
  };

  return (
    <View className="mb-4 flex items-center">
      <Controller
        control={control}
        name={`question${question.id}`}
        rules={{ required: 'This field is required' }}
        render={({ field: { onChange, value } }) => (
          <>
            <View className="relative w-full items-center">
              <Image source={require('../assets/age.png')} className="w-62 h-76" />
              {options.map((option, index) => (
                <React.Fragment key={index}>
                  <View style={[styles.labelContainer, { top: option.labelTop, left: option.labelLeft }]}>
                    <Text style={styles.labelText}>{option.label}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleSelectOption(onChange, option)}
                    style={[
                      styles.circle,
                      { 
                        top: option.top, 
                        left: option.left, 
                        backgroundColor: selectedOptions.includes(option.value) ? 'rgba(128, 0, 128, 0.5)' : 'rgba(255, 255, 255, 0.5)' 
                      },
                    ]}
                  />
                </React.Fragment>
              ))}
            </View>
            {errors[`question${question.id}`] && (
              <Text className="text-red-500 mt-2 font-semibold">{errors[`question${question.id}`].message}</Text>
            )}
            {selectedOptions.length > 0 && (
              <TouchableOpacity 
                style={styles.finishButton} 
                onPress={handleFinish}
              >
                <Text style={styles.finishButtonText}>Finish</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 25,
    borderColor: '#AF47D2',
    borderWidth: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#AF47D2',
  },
  labelText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#86469C',
  },
  finishButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#AF47D2',
    borderRadius: 10,
  },
  finishButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DiscomfortQuestion;
