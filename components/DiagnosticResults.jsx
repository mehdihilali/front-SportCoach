import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
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
  "Do you have any serious back problems?": "Back Problems ?",
  "Are you experiencing discomfort anywhere?": "Discomfort In"
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
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: verticalScale(100) }} className="bg-gray-900 p-4">
      <View className="flex-1 p-4">
        <Text className="text-purple-600 font-psemibold text-3xl mb-6 mt-10 text-center" style={{ fontSize: moderateScale(28) }}>
          Diagnostic Results
        </Text>

        <View className="flex flex-col justify-between">
          {filteredResponses.map(([question, answer], index) => (
            <View
              key={index}
              className="bg-gray-800 rounded-lg mb-4 p-4 shadow-lg"
              style={{
                width: '100%',
                height: moderateScale(80), // Smaller height for each card
                padding: moderateScale(10),
                marginBottom: verticalScale(12),
              }}
            >
              <View className="flex flex-row justify-between items-center mb-2">
                <Text className="text-purple-500 text-lg font-semibold" style={{ fontSize: moderateScale(16) }}>
                  {questionTextMap[question] || question}
                </Text>
                <TouchableOpacity onPress={() => toggleVisibility(index)} className="ml-2">
                  <Ionicons name={visibleAnswers[index] ? "eye-outline" : "eye-off-outline"} size={moderateScale(20)} color="#d8b4fe"/>
                </TouchableOpacity>
              </View>
              {visibleAnswers[index] && (
                <View className="bg-gray-700 p-3 rounded-lg" style={{ padding: moderateScale(8) }}>
                  {typeof answer === 'object' && answer !== null ? (
                    Object.entries(answer).map(([key, value]) => (
                      <Text key={key} className="text-gray-300 text-base mb-1" style={{ fontSize: moderateScale(14) }}>
                        {`${key}: ${value}`}
                      </Text>
                    ))
                  ) : (
                    <Text className="text-gray-300 text-base" style={{ fontSize: moderateScale(14) }}>
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
          style={{
            padding: moderateScale(12),
            marginTop: verticalScale(20),
          }}
        >
          <Ionicons name="bulb-outline" size={moderateScale(24)} color="white" />
          <Text className="text-white text-lg font-semibold ml-2" style={{ fontSize: moderateScale(18) }}>Go to Tips</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DiagnosticResults;
