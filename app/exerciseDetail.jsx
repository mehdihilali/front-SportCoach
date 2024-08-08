import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Anticons from 'react-native-vector-icons/AntDesign';

const ExerciseDetail = () => {
  const router = useRouter();
  const item = useLocalSearchParams();

  return (
    <View className="flex-1 bg-primary">
      <View className="shadow-md rounded-b-3xl overflow-hidden">
        <Image
          source={{ uri: item.gifUrl }}
          resizeMode="cover"
          style={{ width: wp(100), height: wp(100) }}
        />
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute right-4 top-4 bg-white p-2 rounded-full shadow-md"
        >
          <Anticons name='closecircle' size={hp(3)} color="#581c87" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="mx-4 mt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(10) }}
      >
        <Text style={{ fontSize: hp(3.5) }} className="font-psemibold tracking-wide text-purple-400 mb-4">
          {item?.name}
        </Text>

        <View className="bg-gray-800 p-4 rounded-xl shadow-lg mb-4">
          <Text style={{ fontSize: hp(2.5) }} className="font-psemibold tracking-wide text-gray-100 mb-2">
            Equipment: <Text className="font-psemibold text-purple-300">
              {item?.equipment}
            </Text>
          </Text>
          <Text style={{ fontSize: hp(2.5) }} className="font-psemibold tracking-wide text-gray-100 mb-2">
            Secondary Muscles: <Text className="font-psemibold text-purple-300">
              {item?.secondaryMuscles}
            </Text>
          </Text>
          <Text style={{ fontSize: hp(2.5) }} className="font-psemibold tracking-wide text-gray-100 mb-2">
            Target: <Text className="font-psemibold text-purple-300">
              {item?.target}
            </Text>
          </Text>
        </View>

        <Text style={{ fontSize: hp(3) }} className="font-psemibold tracking-wide text-purple-400 mb-4">
          Instructions
        </Text>
        <View className="bg-gray-800 p-4 rounded-xl shadow-lg">
          {
            item.instructions.split(',').map((instruction, index) => (
              <Text
                key={index}
                style={{ fontSize: hp(2) }}
                className="text-gray-100 mb-2"
              >
                {index + 1}. {instruction.trim()}
              </Text>
            ))
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default ExerciseDetail;
