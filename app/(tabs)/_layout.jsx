import { View, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from "../../constants";

const TabIcon = ({ icon, color, focused }) => {
    return (
        <View className="items-center justify-center p-2">
            <View className={`${focused ? 'bg-purple-400' : 'bg-transparent'} items-center justify-center w-10 h-10 rounded-full`}>
                <Image
                    source={icon}
                    resizeMode='contain'
                    className="w-6 h-6"
                    style={{ tintColor: color }}
                />
            </View>
        </View>
    );
}

const TabsLayout = () => {
    return (
        <View className="flex-1 bg-[#161622]">
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFFFFF',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#1f2937',
                        borderTopWidth: 0,
                        height: 70,  // Reduced height
                        marginHorizontal: 25,  // Reduced horizontal margin
                        marginBottom: 5,  // Reduced bottom margin
                        borderRadius: 20,  // Reduced border radius
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                        elevation: 5,
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        right: 10,
                        overflow: 'hidden',
                    }
                }}
            >
                <Tabs.Screen
                    name='home'
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name='diagnostic'
                    options={{
                        title: 'Diagnostic',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.diagnostic}
                                color={color}
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name='exercise'
                    options={{
                        title: 'Exercise',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.exercice}
                                color={color}
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name='recommendation'
                    options={{
                        title: 'Recommendation',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.nutrition}
                                color={color}
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name='profile'
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </View>
    );
}

export default TabsLayout;
