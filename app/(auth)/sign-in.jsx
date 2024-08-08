import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import GoogleButton from '../../components/GoogleButton';
import DividerWithText from '../../components/DividerWithText';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import { useGlobalContext } from '../../context/GlobalProvider';
import { images } from '../../constants';
import { useWindowDimensions } from 'react-native';
import { SERVER_IP } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import 'expo-dev-client';

GoogleSignin.configure({
  webClientId: process.env.GOOGLE_CLIENT_ID, // Ensure this matches your server CLIENT_ID
  forceCodeForRefreshToken: true, // Ensure account selection
});

const SignIn = () => {
  const [initializing, setInitializing] = useState(true);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setSubmitting] = useState(false);

  const { setUser, setIsLogged } = useGlobalContext();
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  useEffect(() => {
    const onAuthStateChanged = (profile) => {
      console.log("onAuthStateChanged:", profile);
      setProfile(profile);
      if (initializing) setInitializing(false);
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, [initializing]);

  const onGoogleButtonPress = async () => {
    try {
      console.log("Starting Google Sign-In");
      await GoogleSignin.signOut(); // Ensure the user can select an account

      const { idToken } = await GoogleSignin.signIn();
      console.log("Google Sign-In ID Token:", idToken);

      // Optionally verify token expiration here (although this is usually handled by the server)

      const response = await axios.post(`http://${SERVER_IP}:5001/google-login`, { token: idToken });

      if (response.data.status === 'ok') {
        const token = response.data.data.token;
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('signInMethod', 'google');

        const userResponse = await axios.get(`http://${SERVER_IP}:5001/user-info`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = userResponse.data.data;
        setUser(user);
        setIsLogged(true);

        showMessage({
          message: 'Success',
          description: 'Logged in successfully with Google',
          type: 'success',
        });
        setTimeout(() => {
          router.replace('/home');
        }, 500); // Add a delay to show the success message before navigating
      } else {
        showMessage({
          message: 'Error',
          description: response.data.data,
          type: 'danger',
        });
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      showMessage({
        message: 'Error',
        description: 'Google Sign-In failed',
        type: 'danger',
      });
    }
  };

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      showMessage({
        message: 'Error',
        description: 'Please fill in all fields',
        type: 'danger',
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(`http://${SERVER_IP}:5001/login-user`, form);
      if (response.data.status === 'ok') {
        const token = response.data.data.token;
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('signInMethod', 'simple');
        const userResponse = await axios.get(`http://${SERVER_IP}:5001/user-info`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = userResponse.data.data;
        setUser(user);
        setIsLogged(true);

        const diagnosticCompleted = user.diagnosticCompleted;
        await AsyncStorage.setItem('diagnosticCompleted', JSON.stringify(diagnosticCompleted));

        showMessage({
          message: 'Success',
          description: 'Logged in successfully',
          type: 'success',
        });
        setTimeout(() => {
          router.replace('/home');
        }, 500); // Add a delay to show the success message before navigating
      } else {
        showMessage({
          message: 'Error',
          description: response.data.data,
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Something went wrong',
        type: 'danger',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (initializing) return null;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full justify-center min-h-[90vh] px-4 my-10">
          <View className="items-center mb-10">
            <Image source={images.logoSport} resizeMode="contain" style={{ width: width * 0.3, height: height * 0.07 }} />
          </View>
          <Text className="text-white text-2xl font-psemibold py-5">
            Log in into <Text className="font-psemibold text-purple-600">SportCoach</Text>
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry
          />
          <CustomButton title="Sign In" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
          <DividerWithText text="OR"/>
          <GoogleButton title="Continue With Google" handlePress={onGoogleButtonPress} containerStyles="mt-7" />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-purple-600">
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;