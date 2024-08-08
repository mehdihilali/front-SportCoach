import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

const HeightQuestion = ({ question, onNext }) => {
  const [meter, setMeter] = useState(1);
  const [centimeter, setCentimeter] = useState(70);

  const handleNext = () => {
    const height = { meter: parseFloat(meter), centimeter: parseFloat(centimeter) };
    /* console.log('Height to be passed:', height); */
    onNext({ [`question${question.id}`]: height });
  };

  const renderPickerItem = (item, setValue, value) => (
    <TouchableOpacity key={item} onPress={() => setValue(item)} className="p-4 mx-4 rounded-lg items-center">
      <Text className={`text-2xl ${value === item ? 'text-white text-3xl' : 'text-gray-500'}`}>{item}</Text>
    </TouchableOpacity>
  );

  const dataMeter = Array.from({ length: 11 }, (_, i) => i.toString());
  const dataCentimeter = Array.from({ length: 100 }, (_, i) => i.toString());

  return (
    <View className="flex-1 items-center justify-center bg-primary p-6">
      <View className="flex-row items-center justify-center mb-20">
        <Text className="text-6xl text-gray-100 font-bold">{meter}</Text>
        <Text className="text-xl text-gray-100 mx-2">m</Text>
        <Text className="text-6xl text-gray-100 font-bold">{centimeter}</Text>
        <Text className="text-xl text-gray-100 mx-2">cm</Text>
      </View>
      <View className="flex-row items-center justify-center mb-6">
        <ScrollView
          horizontal
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          className="w-1/2 border rounded-3xl border-purple-500"
          showsHorizontalScrollIndicator={false}
        >
          {dataMeter.map(item => renderPickerItem(item, setMeter, meter))}
        </ScrollView>
        <View className="justify-center text-center items-center">
          <Text className="text-2xl">{'  '}</Text>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          className="w-1/2 border rounded-3xl border-purple-500"
          showsHorizontalScrollIndicator={false}
        >
          {dataCentimeter.map(item => renderPickerItem(item, setCentimeter, centimeter))}
        </ScrollView>
      </View>
      <View className="w-full bg-blue-200 p-4 mt-5 mb-6 rounded-2xl">
        <Text className="text-blue-900 text-base font-medium">Calculating your body mass index</Text>
        <Text className="text-blue-800 text-sm">BMI is widely used as a risk factor for the development or prevalence of several health issues.</Text>
      </View>
      <TouchableOpacity onPress={handleNext} className="w-full py-3 px-8 bg-purple-600 rounded-xl mt-2">
        <Text className="text-white text-lg font-semibold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeightQuestion;