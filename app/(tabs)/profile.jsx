import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';
import axios from 'axios';
import { SERVER_IP } from '@env';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';
import ProfileSliderImages from '../../components/ProfileSliderImages';

const Profile = () => {
  const { user, setIsLogged, setUser } = useGlobalContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const logout = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const signInMethod = await AsyncStorage.getItem('signInMethod');
      
      if (signInMethod === 'google') {
        const currentUser = await GoogleSignin.getCurrentUser();
        if (currentUser) {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
        }
      } else if (signInMethod === 'simple') {
        const currentUser = auth().currentUser;
        if (currentUser) {
          await auth().signOut();
        }
      }

      await AsyncStorage.multiRemove(['userToken', 'signInMethod', 'diagnosticCompleted']);
      setIsLogged(false);
      setUser(null);
      showMessage({
        message: 'Success',
        description: 'Signed out successfully',
        type: 'success',
      });
      router.replace('/sign-in');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.warn("Google Sign-Out: User is not signed in.");
      } else {
        console.error("Sign-Out Error:", error);
        showMessage({
          message: 'Error',
          description: 'Sign-Out failed',
          type: 'danger',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity className="w-full items-end mb-10" onPress={logout} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Animatable.Image animation="fadeIn" source={icons.logout} resizeMode="contain" className="w-6 h-6 ml-80" />
          )}
        </TouchableOpacity>
        <View className="rounded-full border-4 border-purple-500 overflow-hidden w-36 h-36 md:w-60 md:h-60">
          <Video
            source={{ uri: 'https://drive.google.com/uc?export=download&id=1QmCVOjJ8TCazTjOv_SQQXgMDJoY4Rgfc' }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            repeat
            muted
          />
        </View>
        <View className="mt-5">
          <Text className="font-psemibold text-2xl md:text-3xl text-purple-300 text-center">{user?.username}</Text>
          <Text className="text-lg md:text-xl text-gray-400">{user?.email}</Text>
        </View>
      </View>

      <View className="w-full">
        <ProfileSliderImages />
      </View>

      <Text className="text-gray-200 font-pmedium text-lg md:text-[20px] text-center">
        Join 
        <Text className="text-purple-500 font-psemibold"> PowerFitness</Text>
      </Text>
      <View className="flex-row mb-36 justify-center items-center space-x-3">
        <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/powerfts?mibextid=ZbWKwL')} className="mt-1">
          <Animatable.Image 
            animation="bounceIn"
            iterationCount="infinite"
            source={icons.facebook}
            resizeMode="contain"
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:powerfitness478@gmail.com')} className="mt-1">
          <Animatable.Image 
            animation="bounceIn"
            iterationCount="infinite"
            source={icons.gmail}
            resizeMode="contain"
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/powerfts/')} className="mt-1">
          <Animatable.Image 
            animation="bounceIn"
            iterationCount="infinite"
            source={icons.instagram}
            resizeMode="contain"
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/212688888435')} className="mt-1">
          <Animatable.Image 
            animation="bounceIn"
            iterationCount="infinite"
            source={icons.whatsapp}
            resizeMode="contain"
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
