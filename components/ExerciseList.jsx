import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ExerciseList = ({ data }) => {
    const router = useRouter();
    return (
        <View className="flex-1 bg-primary px-5">
            <FlatList 
                data={data}
                numColumns={2}
                keyExtractor={item => item.name}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp(10), paddingTop: hp(2) }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item, index }) => <ExerciseCard router={router} item={item} index={index} />}
            />
        </View>
    );
}

const ExerciseCard = ({ item, router, index }) => {
    return (
        <TouchableOpacity 
            style={{
                flex: 1,
                margin: wp(2),
                borderRadius: wp(4),
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.8,
                shadowRadius: 10,
                elevation: 10,
                overflow: 'hidden',
                backgroundColor: '#1F1F1F',
                borderWidth: 1,
                borderColor: '#444'
            }}
            onPress={() => router.push({ pathname: '/exerciseDetail', params: item })} // Navigate to detail page
        >
            <View style={{ borderTopLeftRadius: wp(4), borderTopRightRadius: wp(4), overflow: 'hidden' }}>
                <Image 
                    source={{ uri: item.gifUrl }}
                    style={{ width: '100%', height: hp(20) }}
                    resizeMode="cover"
                />
            </View>
            <View 
                style={{
                    padding: wp(3),
                    alignItems: 'center',
                    borderBottomLeftRadius: wp(4),
                    borderBottomRightRadius: wp(4),
                    backgroundColor: '#2C2C2E',
                    position: 'relative',
                }}
            >
                <Text style={{
                    fontSize: wp(4),
                    color: '#FFF',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: wp(2)
                }}>
                    {item?.name?.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default ExerciseList;
