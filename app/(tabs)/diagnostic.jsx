import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, ScrollView, RefreshControl } from 'react-native';
import { useForm } from 'react-hook-form';
import NumericQuestion from '../../components/NumericQuestion';
import SelectQuestion from '../../components/SelectQuestion';
import YesNoQuestion from '../../components/YesNoQuestion';
import AgeQuestion from '../../components/AgeQuestion';
import MultiSelectQuestion from '../../components/MultiSelectQuestion';
import questions from '../../components/questions/questions';
import { images } from '../../constants';
import { useWindowDimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import HeightQuestion from '../../components/HeightQuestion';
import DiscomfortQuestion from '../../components/DiscomfortQuestion';
import WeightQuestion from '../../components/WeightQuestion';
import TargetWeightQuestion from '../../components/TargetWeightQuestion';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_IP } from '@env';
import DiagnosticResults from '../../components/DiagnosticResults';  // Import the new component

const Diagnostic = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [showProgressCircle, setShowProgressCircle] = useState(false);
  const [progress, setProgress] = useState(0);
  const [diagnosticCompleted, setDiagnosticCompleted] = useState(false);
  const [completedResponses, setCompletedResponses] = useState({});
  const [loading, setLoading] = useState(true); // State to track loading
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const rotation = useRef(new Animated.Value(0)).current;

  const fetchDiagnosticStatus = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      try {
        const response = await axios.get(`http://${SERVER_IP}:5001/get-diagnostic`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.status === 'completed') {
          setDiagnosticCompleted(true);
          setCompletedResponses(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching diagnostic status:', error);
      }
    }
    setLoading(false);
    setRefreshing(false); // End the refreshing state
  };

  useEffect(() => {
    fetchDiagnosticStatus();
  }, []);

  useEffect(() => {
    let timer;
    if (showProgressCircle) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1;
          } else {
            clearInterval(timer);
            return prevProgress;
          }
        });
      }, 50); // Adjust the interval time as needed
    }
    return () => clearInterval(timer);
  }, [showProgressCircle]);

  const onNext = async (data) => {
    const questionText = questions[currentQuestionIndex].text;
    setResponses({ ...responses, [questionText]: data[`question${questions[currentQuestionIndex].id}`] });

    if (currentQuestionIndex < questions.length - 1) {
      animateLogo();
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        reset();
      }, 1200);
    } else {
      const finalResponses = { ...responses, [questionText]: data[`question${questions[currentQuestionIndex].id}`] };
      console.log('Questionnaire completed', finalResponses);
      setShowProgressCircle(true);

      // Save diagnostic information to the backend
      try {
        const token = await AsyncStorage.getItem('userToken');  // Use the correct key
        console.log('Retrieved token:', token);
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await axios.post(`http://${SERVER_IP}:5001/save-diagnostic`, 
          { responses: finalResponses },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Diagnostic information saved successfully');

        // Set completed responses and mark diagnostic as completed
        setCompletedResponses(finalResponses);
        setDiagnosticCompleted(true);
        fetchDiagnosticStatus(); // Refetch to get the latest data
      } catch (error) {
        console.error('Error saving diagnostic information:', error);
      }
    }
  };

  const onPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      reset();
    }
  };

  const animateLogo = () => {
    rotation.setValue(0);
    Animated.timing(rotation, {
      toValue: 2,
      duration: 1200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    switch (question.type) {
      case 'numeric':
        return <NumericQuestion control={control} question={question} errors={errors} onNext={onNext} />;
      case 'select':
        return <SelectQuestion control={control} question={question} errors={errors} onNext={onNext} />;
      case 'yesno':
        return <YesNoQuestion control={control} question={question} errors={errors} onNext={onNext} />;
      case 'age':
        return <AgeQuestion control={control} question={question} errors={errors} onNext={onNext} />;
      case 'multi-select':
        return <MultiSelectQuestion control={control} question={question} errors={errors} onNext={onNext} isLastQuestion={isLastQuestion} />;
      case 'height':
        return <HeightQuestion control={control} question={question} errors={errors} onNext={onNext} />;
      case 'weight':
        const heightQuestionText = questions.find(q => q.type === 'height').text;
        const heightData = responses[heightQuestionText];
        return <WeightQuestion control={control} question={question} errors={errors} onNext={onNext} height={heightData} />;
      case 'target-weight':
        const weightQuestionText = questions.find(q => q.type === 'weight').text;
        const previousWeight = responses[weightQuestionText].weight;
        return <TargetWeightQuestion control={control} question={question} errors={errors} onNext={onNext} previousWeight={previousWeight} />;
      case 'discomfort':
        return <DiscomfortQuestion key={question.id} control={control} question={question} errors={errors} onNext={onNext} />;
      default:
        return null;
    }
  };

  const progressPercentage = (currentQuestionIndex + 1) / questions.length * 100;

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1 bg-primary"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => {
          setRefreshing(true);
          fetchDiagnosticStatus();
        }} />
      }
    >
      <View className="flex-1 p-6 justify-center items-center">
        {diagnosticCompleted && !loading ? (
          <DiagnosticResults completedResponses={completedResponses} navigation={navigation} />
        ) : (
          <>
            {currentQuestionIndex > 0 && !showProgressCircle && (
              <TouchableOpacity
                style={{ position: 'absolute', top: 40, left: 20 }}
                className="flex-row items-center"
                onPress={onPrevious}
              >
                <Icon name="arrow-back" size={28} color="#7F3DFF" />
              </TouchableOpacity>
            )}
            {!showProgressCircle && (
              <View className="justify-center items-center mb-19">
                <Animated.Image
                  source={images.logoSport}
                  resizeMode="contain"
                  style={{ width: moderateScale(100), height: moderateScale(100), transform: [{ rotate }] }}
                  className="w-24 h-24"
                />
              </View>
            )}

            {!showProgressCircle && (
              <>
                <View className="w-full h-4 bg-gray-300 rounded-full overflow-hidden mt-5 mb-10">
                  <View
                    style={{ width: `${progressPercentage}%` }}
                    className="h-full bg-purple-800"
                  >
                  </View>
                </View>
                <Text className="text-gray-100 font-psemibold text-2xl mb-10 mt-5 text-center">
                  {questions[currentQuestionIndex].text}
                </Text>
                {renderQuestion()}
              </>
            )}

            {showProgressCircle && !diagnosticCompleted && (
              <View className="justify-center items-center">
                <AnimatedCircularProgress
                  size={140}
                  width={15}
                  fill={progress}
                  tintColor="#a200ff"
                  backgroundColor="#3d5875"
                >
                  {
                    (fill) => (
                      <Text style={{ fontSize: 24, color: '#a200ff' }}>
                        {`${Math.round(fill)}%`}
                      </Text>
                    )
                  }
                </AnimatedCircularProgress>
                <Text className="text-gray-100 font-psemibold text-2xl mt-10 text-center">
                  Creating your personalized plan...
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Diagnostic;
