import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchExerciceByBodyPart } from '../api/exerciceDB';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExerciseList from '../components/ExerciseList';
import { ScrollView } from 'react-native-virtualized-view';

const Exercises = () => {
    const router = useRouter();
    const [exercises, setExercises] = useState([]);
    const item = useLocalSearchParams();
    const [lastBodyPart, setLastBodyPart] = useState(null);

    useEffect(() => {
        if (item && item.name && item.name !== lastBodyPart) {
            getExercises(item.name);
            setLastBodyPart(item.name);
        }
    }, [item]);

    const getExercises = async (bodyPart) => {
        let data = await fetchExerciceByBodyPart(bodyPart);
        setExercises(data);
    };

    return (
        <ScrollView className="bg-primary">
            <StatusBar style="light" />
            <Image
                source={item.image}
                style={{ width: wp(100), height: hp(45) }}
                className="rounded-b-[40px]"
            />
            <TouchableOpacity
                className="bg-purple-300 mx-4 absolute rounded-full justify-center items-center pr-1.5 mt-5"
                style={{ height: hp(5), width: hp(5) }}
                onPress={() => router.back()}
            >
                <Ionicons name='caret-back-outline' size={hp(4)} color="#581c87" />
            </TouchableOpacity>

            <View className="mx-4 space-y-3 mt-4">
                <Text style={{ fontSize: hp(2) }} className="font-psemibold text-purple-500">
                    {item.name} exercises
                </Text>
                <View className="mb-10">
                    <ExerciseList data={exercises} />
                </View>
            </View>
        </ScrollView>
    );
};

export default Exercises;
