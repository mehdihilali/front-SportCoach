import React, { useEffect, useRef } from 'react';
import { Link, Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, TouchableOpacity, Linking, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome from expo-vector-icons
import { icons, images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
import { moderateScale } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com/powerfts?mibextid=ZbWKwL');
  };

  const handleGmailPress = () => {
    Linking.openURL('mailto:powerfitness478@gmail.com');
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/powerfts/');
  };

  const handleWhatsAppPress = () => {
    Linking.openURL('https://wa.me/212688888435');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
        <View className="w-full justify-center items-center px-4">
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            source={images.logoSport}
            style={{ width: '25%', height: undefined, aspectRatio: 1.75, maxWidth: 175 }}
            resizeMode="contain"
          />
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            source={images.powerFitness}
            style={{ width: '90%', height: undefined, aspectRatio: 1.5, maxWidth: 380, marginTop: 25 }}
            resizeMode="contain"
          />

          <Animatable.View animation="zoomIn" duration={1000} style={{ marginTop: 40, marginBottom: 20 }}>
            <View className="relative">
              <Text className="text-2xl text-white font-bold text-center">
                Découvrez des Possibilités{"\n"}
                Infinies et Transformez Votre Vie{"\n"}
                avec <Text className="text-purple-600">SportCoach</Text>
              </Text>
            </View>
          </Animatable.View>

          <Animatable.View animation="pulse" iterationCount="infinite" style={{ width: '100%' }}>
            <CustomButton
              title="Continue with Email"
              handlePress={() => router.push('/sign-in')}
              containerStyles="w-full mt-10 h-16 bg-purple-600 rounded-lg justify-center items-center"
              textStyle="text-lg text-white font-bold"
            />
          </Animatable.View>

          <View className="justify-center items-center text-center">
            <Text className="text-center text-gray-200 mt-10 font-pregular text-[16px]">Powered By {''}
              <Link href='https://powerfitness.co.ma/' className="text-purple-600 font-psemibold">PowerFitness</Link>
            </Text>
            <View className="flex-row mt-5 space-x-3">
              <TouchableOpacity onPress={handleFacebookPress} className="mt-1">
                <Animatable.Image 
                  animation="bounceIn"
                  iterationCount="infinite"
                  source={icons.facebook}
                  resizeMode="contain"
                  style={{ width: moderateScale(30), height: moderateScale(30) }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleGmailPress} className="mt-1">
                <Animatable.Image 
                  animation="bounceIn"
                  iterationCount="infinite"
                  source={icons.gmail}
                  resizeMode="contain"
                  style={{ width: moderateScale(30), height: moderateScale(30) }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleInstagramPress} className="mt-1">
                <Animatable.Image 
                  animation="bounceIn"
                  iterationCount="infinite"
                  source={icons.instagram}
                  resizeMode="contain"
                  style={{ width: moderateScale(30), height: moderateScale(30) }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleWhatsAppPress} className="mt-1">
                <Animatable.Image 
                  animation="bounceIn"
                  iterationCount="infinite"
                  source={icons.whatsapp}
                  resizeMode="contain"
                  style={{ width: moderateScale(30), height: moderateScale(30) }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
