import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-purple-500 rounded-xl min-h-[68px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
    >
        <Text className={`text-primary font-psemibold text-xl ${textStyles}`}>{ title }</Text>
    </TouchableOpacity>
  )
}

export default CustomButton