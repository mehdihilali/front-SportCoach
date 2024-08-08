// pages/Home.jsx
import React, { useEffect } from 'react';
import { View, Text, Alert, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { images, icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
import { SERVER_IP } from '@env';
import * as Animatable from 'react-native-animatable';
import ClickableCard from '../../components/ClickableCard';
import { getCurrentDate } from '../../utils/getCurrentDate';

const Home = () => {
  const { user, setIsLogged, setUser } = useGlobalContext();
  const router = useRouter();

  const fetchUserInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');

    if (token) {
      try {
        const res = await axios.get(`http://${SERVER_IP}:5001/user-info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.status === 'ok') {
          setUser(res.data.data);
        } else {
          Alert.alert('Error', res.data.data);
        }
      } catch (e) {
        Alert.alert('Error', 'Failed to fetch user info');
      }
    } else {
      router.replace('/sign-in');
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserInfo();
    }
  }, []);

  const handleNavigation = (route) => {
    router.push(route);
  };

  const currentDate = getCurrentDate();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ padding: 16 }} className="bg-primary">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-xl text-gray-100">Welcome Back</Text>
            <Text className="text-3xl font-bold text-purple-500 mt-2">
              {user?.username}
            </Text>
          </View>
          <Image
            source={images.logoSport}
            className="w-32 h-16"
            resizeMode="contain"
          />
        </View>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          className="bg-purple-100 rounded-xl p-4 mt-4"
        >
          <Text className="text-base font-medium text-red-800 text-center">
            Important Notice
          </Text>
          <Text className="text-red-900 mt-2">
            You have the right to pass the diagnostic only once. You will not be able to modify or update your choices once you have completed the diagnostic.
          </Text>
        </Animatable.View>
        <View className="mt-4">
          <View className="flex flex-row flex-wrap justify-center mt-20">
            <View className="w-1/2 p-2">
              <ClickableCard
                title="Diagnostic"
                image={images.diagnosticBackground}
                icon={icons.diagnostic}
                date={currentDate}
                onPress={() => handleNavigation('/diagnostic')}
              />
            </View>
            <View className="w-1/2 p-2">
              <ClickableCard
                title="Recommendation"
                image={images.recommendationBackground}
                icon={icons.nutrition}
                date={currentDate}
                onPress={() => handleNavigation('/recommendation')}
              />
            </View>
            <View className="w-1/2 p-2">
              <ClickableCard
                title="Profile"
                image={images.profileBackground}
                icon={icons.user}
                date={currentDate}
                onPress={() => handleNavigation('/profile')}
              />
            </View>
            <View className="w-1/2 p-2">
              <ClickableCard
                title="Exercises"
                image={images.exerciseBackground}
                icon={icons.exercice}
                date={currentDate}
                onPress={() => handleNavigation('/exercise')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
