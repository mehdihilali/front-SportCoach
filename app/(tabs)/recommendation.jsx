import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, LayoutAnimation, Platform, UIManager } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_IP } from '@env';
import CustomButton from '../../components/CustomButton'; // Adjust the path as needed
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Recommendation = () => {
  const [diagnosticStatus, setDiagnosticStatus] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDiagnosticData = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        try {
          const response = await axios.get(`http://${SERVER_IP}:5001/get-diagnostic`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Diagnostic response:', response.data); // Log the diagnostic response
          setDiagnosticStatus(response.data.status);
          if (response.data.status === 'completed') {
            if (response.data.data && response.data.data.recommendation) {
              setRecommendations([response.data.data.recommendation]); // Assuming response.data.data.recommendation is an object
              console.log('Recommendations:', response.data.data.recommendation); // Log the recommendations
            }
          }
        } catch (error) {
          console.error('Error fetching diagnostic status:', error);
        }
      } else {
        console.log('Token not found'); // Log if token is not found
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchDiagnosticData();
    });

    fetchDiagnosticData();

    return unsubscribe;
  }, [navigation]);

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const openModal = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecommendation(null);
  };

  const renderSteps = (steps) => {
    if (Array.isArray(steps)) {
      return steps.map((step, index) => (
        <Text key={index} className="text-white font-semibold mb-2 mt-2">
          - <Text className="text-purple-300">{step.split(':')[0]}</Text>{step.includes(':') ? `:${step.split(':')[1]}` : step}
        </Text>
      ));
    } else if (typeof steps === 'string') {
      return steps.split('\n').map((step, index) => {
        const isMainTitle = step.match(/^\d+\./); // Check if the line starts with a number followed by a period
        if (isMainTitle) {
          const titleMatch = step.match(/(\d+\.\*\*.*?\*\*)/);
          const title = titleMatch ? titleMatch[0] : step;
          return (
            <Text key={index} className="text-secondary-100 text-[18px] font-bold mb-2 mt-2">
              - {title}
            </Text>
          );
        }
        return (
          <Text key={index} className="text-white text-base font-medium mb-2">
            - {step}
          </Text>
        );
      });
    } else if (typeof steps === 'object' && steps !== null) {
      return Object.entries(steps).map(([key, value], index) => (
        <View key={index} className="mb-2">
          <Text className="text-blue-400 text-xl font-bold ml-5">
            {index + 1}. <Text className="text-yellow-300">{key}:</Text>
          </Text>
          {renderSteps(value)}
        </View>
      ));
    }
    return null;
  };

  const renderTimeNeeded = (timeNeeded) => {
    if (typeof timeNeeded === 'object' && timeNeeded !== null) {
      return Object.entries(timeNeeded).map(([key, value], index) => (
        <View key={index} className="mb-4">
          <Text className="text-white text-lg font-semibold mb-2">{key}:</Text>
          <Text className="text-white text-base">{value}</Text>
        </View>
      ));
    } else if (typeof timeNeeded === 'string') {
      return <Text className="text-white text-base font-medium">{timeNeeded}</Text>;
    }
    return null;
  };

  if (diagnosticStatus === 'not_completed') {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-gray-900">
        <Text className="text-white text-lg mb-4 text-center">
          You need to complete the diagnostic first.
        </Text>
        <CustomButton
          title="Go to Diagnostic"
          handlePress={() => navigation.navigate('diagnostic')}
          containerStyles="bg-purple-700 p-4 rounded-lg"
          textStyles="text-white text-lg font-semibold"
        />
      </View>
    );
  }

  if (recommendations.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-gray-900">
        <Text className="text-white text-lg">Loading recommendations...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4 bg-gray-900" contentContainerStyle={{ justifyContent: 'center', paddingBottom: 100}}>
      {recommendations.map((recommendation, index) => (
        <View key={index} className="bg-gray-800 rounded-lg mb-6 shadow-lg overflow-hidden">
          <TouchableOpacity 
            onPress={() => toggleExpand(index)} 
            className="bg-gray-800 rounded-lg shadow-lg mt-10 mb-10 w-[90%] p-5 items-center justify-center"
            style={{ alignSelf: 'center' }}
          >
            <View className="items-center justify-center">
              {recommendation.imageUrl && (
                <Animatable.Image 
                  animation="pulse" 
                  iterationCount="infinite" 
                  source={{ uri: recommendation.imageUrl }} 
                  className="rounded-full mb-6 w-60 h-60"
                />
              )}
              <Text 
                className="text-purple-500 text-2xl font-psemibold mb-4 text-center"
              >
                {recommendation.Title}
              </Text>
              <Text 
                className="text-gray-300 text-lg font-psemibold text-center"
              >
                {recommendation.Description?.slice(0, 150)} ...
              </Text>
            </View>
          </TouchableOpacity>
          {expandedIndex === index && (
            <View className="p-4 border-t border-gray-700">
              <Text className="text-purple-500 text-lg font-bold mb-2">Steps to Achieve Goals:</Text>
              {recommendation.HowToAchieveTheGoals && renderSteps(recommendation.HowToAchieveTheGoals)}
              <Text className="text-purple-500 text-lg font-bold mb-2">Time to Finish Program:</Text>
              {recommendation.timeNeededToAchieveGoals && renderTimeNeeded(recommendation.timeNeededToAchieveGoals)}
              <TouchableOpacity onPress={() => openModal(recommendation)} className="mt-4 bg-purple-700 p-4 rounded-lg">
                <Text className="text-white text-lg font-semibold text-center">View More</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
      {selectedRecommendation && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View className="flex-1 justify-center items-center bg-gray-900 bg-opacity-75 p-4">
            <ScrollView className="bg-gray-800 rounded-lg p-6 w-full max-w-lg" contentContainerStyle={{ paddingBottom: 50 }}>
              <Text className="text-purple-600 text-2xl font-bold mb-4 text-center">Recommendation Details</Text>
              {selectedRecommendation.imageUrl && (
                <Image source={{ uri: selectedRecommendation.imageUrl }} className="w-full h-64 rounded-lg mb-4" />
              )}
              <Text className="text-purple-500 text-xl font-semibold mb-2">{selectedRecommendation.Title}</Text>
              <Text className="text-white font-psemibold mb-4">{selectedRecommendation.Description}</Text>
              <Text className="text-purple-500 text-xl font-semibold mb-2">Steps to Achieve Goals:</Text>
              {selectedRecommendation.HowToAchieveTheGoals && renderSteps(selectedRecommendation.HowToAchieveTheGoals)}
              <Text className="text-purple-500 text-xl font-semibold mb-2">Time to Finish Program:</Text>
              {selectedRecommendation.timeNeededToAchieveGoals && renderTimeNeeded(selectedRecommendation.timeNeededToAchieveGoals)}
              <TouchableOpacity onPress={closeModal} className="mt-4 bg-purple-700 p-4 rounded-lg">
                <Text className="text-white text-lg font-semibold text-center">Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

export default Recommendation;
