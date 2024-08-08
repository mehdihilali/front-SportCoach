import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

const bodyParts = [
  { name: 'back', image: require('../assets/bodyParts/back.jpg') },
  { name: 'cardio', image: require('../assets/bodyParts/cardio.jpg') },
  { name: 'chest', image: require('../assets/bodyParts/chest.png') },
  { name: 'lowerArms', image: require('../assets/bodyParts/lowerArms.png') },
  { name: 'lowerLegs', image: require('../assets/bodyParts/lowerLegs.png') },
  { name: 'neck', image: require('../assets/bodyParts/neck.png') },
  { name: 'shoulders', image: require('../assets/bodyParts/shoulders.png') },
  { name: 'upperArms', image: require('../assets/bodyParts/upperArms.jpg') },
  { name: 'upperLegs', image: require('../assets/bodyParts/upperLegs.jpg') },
  { name: 'waist', image: require('../assets/bodyParts/waist.png') },
];

const BodyParts = () => {
  const router = useRouter();
  return (
    <FlatList
      data={bodyParts}
      numColumns={2}
      keyExtractor={item => item.name}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50, paddingTop: 10, paddingHorizontal: 30 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      renderItem={({ item }) => (
        <BodyPartCard router={router} item={item} />
      )}
    />
  );
};

const BodyPartCard = ({ item, router }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/exercises', params: { name: item.name, image: item.image } })}
      style={{ width: wp(40), height: hp(22), marginVertical: 20 }}
      className="flex justify-end p-4"
    >
      <Image
        source={item.image}
        style={{ width: wp(40), height: hp(22) }}
        className="rounded-2xl absolute"
        resizeMode="cover"
      />
      <View style={{ width: wp(40), height: hp(6) }} className="absolute bottom-0 bg-gradient-to-t from-black rounded-b-2xl" />
      <Text style={{ fontSize: hp(2.3) }} className="text-white font-semibold mt-auto">
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

export default BodyParts;
