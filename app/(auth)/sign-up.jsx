import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '../../context/GlobalProvider';
import { images } from '../../constants';
import { useWindowDimensions } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SERVER_IP } from '@env';

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const { width, height } = useWindowDimensions();

  const submit = async () => {
    if (form.username === '' || form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(`http://${SERVER_IP}:5001/register`, form);
      if (response.data.status === 'ok') {
        showMessage({
          message: 'Success',
          description: 'Account created successfully',
          type: 'success',
        });
        const loginResponse = await axios.post(`http://${SERVER_IP}:5001/login-user`, {
          email: form.email,
          password: form.password,
        });
        if (loginResponse.data.status === 'ok') {
          await AsyncStorage.setItem('userToken', loginResponse.data.data.token);
          setUser({ email: form.email, username: form.username });
          setIsLogged(true);
          router.replace('/home');
        } else {
          Alert.alert('Error', loginResponse.data.data);
        }
      } else {
        Alert.alert('Error', response.data.data);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Something went wrong during registration');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full justify-center min-h-[90vh] px-4 my-7">
          <View className="items-center mb-5">
            <Image source={images.logoSport} resizeMode="contain" style={{ width: width * 0.3, height: height * 0.07 }} />
          </View>
          <Text className="text-white text-2xl font-psemibold py-5">
            Sign Up to <Text className="text-purple-600">SportCoach</Text>
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
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
          <CustomButton title="Sign Up" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-purple-600">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;


/* import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import axios from 'axios';

import { images } from '../../constants';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const submit = async () => {
    if (form.username === '' || form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      const userData = {
        username: form.username,
        email: form.email,
        password: form.password,
      };
      axios
        .post('http://192.168.1.81:5001/register', userData)
        .then((res) => {
          if (res.data.status === 'ok') {
            Alert.alert('Success', 'Registered Successfully');
            router.replace('/sign-in');
          } else {
            Alert.alert(JSON.stringify(res.data));
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[90vh] px-4 my-7">
          <View className="items-center mb-5">
            <Image source={images.logoSport} resizeMode="contain" className="w-[145px] h-[65px]" />
          </View>
          <Text className="text-white text-2xl font-psemibold py-5">
            Sign Up to <Text className="text-purple-600">SportCoach</Text>
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
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
          />
          <CustomButton title="Sign Up" handlePress={submit} containerStyles="mt-7" />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Have an account already ?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-purple-600">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp; */