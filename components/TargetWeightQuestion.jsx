import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { tw } from 'nativewind';

const TargetWeightQuestion = ({ question, onNext, previousWeight }) => {
  const [weight, setWeight] = useState(50); // Starting with a default value
  const [goalMessage, setGoalMessage] = useState('');

  useEffect(() => {
    const calculateGoalMessage = () => {
      const percentChange = ((weight - previousWeight) / previousWeight) * 100;
      return `CHALLENGING GOAL: gain ${Math.round(percentChange)}% of your body weight\nAs per a study by the University of Utah, even 5-minute workouts every day can help you keep fit and improve your sleep and energy levels.`;
    };
    setGoalMessage(calculateGoalMessage());
  }, [weight, previousWeight]);

  const handleNext = () => {
    onNext({ [`question${question.id}`]: { weight } });
  };

  const renderPickerItem = (item, setValue, value) => (
    <TouchableOpacity key={item} onPress={() => setValue(item)} className="p-4 mx-4 rounded-lg items-center">
      <Text className={`text-2xl ${value === item ? 'text-white text-3xl' : 'text-gray-500'}`}>{item}</Text>
    </TouchableOpacity>
  );

  const dataWeight = Array.from({ length: 150 }, (_, i) => (i + 1).toString()); // Array of weights from 1 to 150 kg

  return (
    <View className="flex-1 items-center justify-center bg-primary p-6">
      <View className="flex-row items-center justify-center mb-28 px-12">
        <ScrollView
          horizontal
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          className="w-1/2 border rounded-3xl border-purple-500"
          showsHorizontalScrollIndicator={false}
        >
          {dataWeight.map(item => renderPickerItem(item, setWeight, weight))}
        </ScrollView>
        <Text className="text-2xl font-psemibold ml-2 text-gray-100">kg</Text>
      </View>
      <View className="w-full bg-blue-200 p-4 mb-10 rounded-2xl">
        <Text className="text-blue-900 text-base font-medium">{goalMessage.split('\n')[0]}</Text>
        <Text className="text-blue-800 text-sm mt-2">{goalMessage.split('\n')[1]}</Text>
      </View>
      <TouchableOpacity onPress={handleNext} className="w-full py-3 px-8 bg-purple-600 rounded-xl mt-2">
        <Text className="text-white text-lg font-semibold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TargetWeightQuestion;