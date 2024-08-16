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
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

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
      <ScrollView
        contentContainerStyle={{ padding: moderateScale(16), paddingBottom: verticalScale(100) }} // Adding padding to avoid being hidden by the tab bar
        className="bg-primary"
      >
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-lg text-gray-100 mt-5">
              Welcome Back
            </Text>
            <Text className="text-2xl font-psemibold text-purple-500 mt-2">
              {user?.username}
            </Text>
          </View>
          <Image
            source={images.logoSport}
            className="w-28 h-16 mt-5"
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
          <View className="flex flex-row flex-wrap justify-between mt-20">
            <View className="w-1/2 p-2">
              <ClickableCard
                title="Diagnostic"
                image={images.diag}
                icon={icons.diagnostic}
                date={currentDate}
                style={{ aspectRatio: 1 }} // Make the card square
                onPress={() => handleNavigation('/diagnostic')}
              />
            </View>
            <View className="w-1/2 p-2">
              <ClickableCard
                title="Recommendation"
                image={images.recommendationBackground}
                icon={icons.nutrition}
                date={currentDate}
                style={{ aspectRatio: 1 }} // Make the card square
                onPress={() => handleNavigation('/recommendation')}
              />
            </View>
            <View className="w-1/2 p-2">
              <ClickableCard
                title="Profile"
                image={images.profileBackground}
                icon={icons.user}
                date={currentDate}
                style={{ aspectRatio: 1 }} // Make the card square
                onPress={() => handleNavigation('/profile')}
              />
            </View>
            <View className="w-1/2 p-2">
              <ClickableCard
                title="Exercises"
                image={images.exerciseBackground}
                icon={icons.exercice}
                date={currentDate}
                style={{ aspectRatio: 1 }} // Make the card square
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
