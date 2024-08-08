import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { tw } from 'nativewind';

const WeightQuestion = ({ question, onNext, height }) => {
  const [weight, setWeight] = useState(47); // Starting with a default value
  const [bmi, setBmi] = useState(null);
  const [bmiMessage, setBmiMessage] = useState('');

  useEffect(() => {
    if (weight && height) {
      const heightInMeters = height.meter + height.centimeter / 100;
      const weightInKg = parseFloat(weight);
      if (!isNaN(heightInMeters) && !isNaN(weightInKg)) {
        const bmiValue = weightInKg / (heightInMeters * heightInMeters);
        setBmi(bmiValue.toFixed(1));

        if (bmiValue < 18.5) {
          setBmiMessage('underweight');
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
          setBmiMessage('normal');
        } else if (bmiValue >= 25 && bmiValue < 29.9) {
          setBmiMessage('overweight');
        } else {
          setBmiMessage('obese');
        }
      } else {
        setBmi('NaN');
        setBmiMessage('Invalid height or weight');
      }
    } else {
      setBmi(null);
      setBmiMessage('');
    }
  }, [weight, height]);

  const handleNext = () => {
    onNext({ [`question${question.id}`]: { weight, unit: 'kg', bmi } });
  };

  const renderPickerItem = (item, setValue, value) => (
    <TouchableOpacity key={item} onPress={() => { setValue(item); calculateBMI(item); }} className="p-4 mx-4 rounded-lg items-center">
      <Text className={`text-2xl ${value === item ? 'text-white text-3xl' : 'text-gray-500'}`}>{item}</Text>
    </TouchableOpacity>
  );

  const dataWeight = Array.from({ length: 150 }, (_, i) => (i + 1).toString()); // Array of weights from 1 to 150 kg

  const calculateBMI = (weightValue) => {
    const heightInMeters = height.meter + height.centimeter / 100;
    const bmiValue = weightValue / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setBmiMessage('underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setBmiMessage('normal');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setBmiMessage('overweight');
    } else {
      setBmiMessage('obese');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-primary p-6">
      <View className="flex-row items-center justify-center mb-28 px-12">
        <ScrollView
          horizontal
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          className="w-1/2 border rounded-3xl border-purple-500 px-2"
          showsHorizontalScrollIndicator={false}
        >
          {dataWeight.map(item => renderPickerItem(item, setWeight, weight))}
        </ScrollView>
        <Text className="text-2xl font-psemibold ml-2 text-gray-100">kg</Text>
      </View>
      {bmi && (
        <View className="w-full bg-blue-200 p-4 mb-10 rounded-2xl">
          <Text className="text-blue-900 text-base font-medium">Your BMI is {''}
            <Text className="font-psemibold text-blue-600">
              {bmi} 
            </Text>
            <Text>
              {''} ,which is considered {''}
            </Text>
            <Text className="font-psemibold text-blue-600">
              {bmiMessage}
            </Text>
          </Text>
          <Text className="text-blue-800 text-sm mt-2">
            Focus on muscle toning and a balanced diet. Stay positive and try to keep your daily calorie consumption in the recommended range.
          </Text>
        </View>
      )}
      <TouchableOpacity onPress={handleNext} className="w-full py-3 px-8 bg-purple-600 rounded-xl mt-2">
        <Text className="text-white text-lg font-semibold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WeightQuestion;