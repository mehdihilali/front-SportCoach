import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const questionTextMap = {
  "What is your age?": "Age",
  "Select your gender": "Gender",
  "What do you want to achieve?": "Goals",
  "What is your height?": "Height",
  "What is your current weight?": "Current Weight",
  "What is your target weight?": "Target Weight",
  "Choose your current body type": "Current Body Type",
  "Choose your target body type": "Target Body Type",
  "What is your activity level?": "Activity Level",
  "How long do you walk on a typical day?": "Daily Walk Duration",
  "Do you have any serious back problems?": "Have Serious Back Problems",
  "Are you experiencing discomfort anywhere?": "Have Discomfort In"
};

const DiagnosticResults = ({ completedResponses }) => {
  const navigation = useNavigation();
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleVisibility = (index) => {
    setVisibleAnswers((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  console.log('Completed Responses:', completedResponses);

  // Ensure completedResponses and responses are properly defined
  if (!completedResponses || !completedResponses.responses) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900 p-4">
        <Text className="text-white text-lg">No diagnostic results available. Please Refresh the page</Text>
      </View>
    );
  }

  const filteredResponses = Object.entries(completedResponses.responses).filter(([question]) =>
    questionTextMap.hasOwnProperty(question)
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} className="bg-gray-900 p-4">
      <View className="flex-1 p-4">
        <Text className="text-white font-bold text-3xl mb-6 text-center">
          Diagnostic Results
        </Text>

        <View className="flex flex-wrap flex-row justify-between">
          {filteredResponses.map(([question, answer], index) => (
            <View key={index} className="bg-gray-800 rounded-lg mb-4 p-4 w-[48%] shadow-lg">
              <View className="flex flex-row justify-between items-center mb-2">
                <Text className="text-purple-500 text-lg font-semibold">
                  {questionTextMap[question] || question}
                </Text>
                <TouchableOpacity onPress={() => toggleVisibility(index)}>
                  <Ionicons name={visibleAnswers[index] ? "eye-outline" : "eye-off-outline"} size={24} color="white" />
                </TouchableOpacity>
              </View>
              {visibleAnswers[index] && (
                <View className="bg-gray-700 p-3 rounded-lg">
                  {typeof answer === 'object' && answer !== null ? (
                    Object.entries(answer).map(([key, value]) => (
                      <Text key={key} className="text-gray-300 text-base mb-1">
                        {`${key}: ${value}`}
                      </Text>
                    ))
                  ) : (
                    <Text className="text-gray-300 text-base">
                      {answer}
                    </Text>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('recommendation')}
          className="bg-purple-700 p-4 rounded-lg w-full max-w-xs flex-row items-center justify-center mt-8 self-center shadow-lg"
        >
          <Ionicons name="bulb-outline" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">Go to Tips</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DiagnosticResults;
