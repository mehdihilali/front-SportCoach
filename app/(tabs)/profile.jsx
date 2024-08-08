import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, Alert, ActivityIndicator } from 'react-native';
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
    if (loading) return; // Prevent multiple logout attempts

    setLoading(true);
    try {
      const signInMethod = await AsyncStorage.getItem('signInMethod');
      
      if (signInMethod === 'google') {
        const currentUser = await GoogleSignin.getCurrentUser();
        if (currentUser) {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
        } else {
          console.warn("Google Sign-In: No user is currently signed in.");
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
      <FlatList
        data={[]}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Image source={icons.logout} resizeMode="contain" className="w-6 h-6 ml-80" />
              )}
            </TouchableOpacity>
            <View className="mt-5">
              <Text className="font-psemibold text-3xl text-gray-100">{user?.username}</Text>
              <Text className="text-xl text-gray-400">{user?.email}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="justify-center items-center h-full">
            <Text className="text-lg text-gray-100">No Information Available</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;