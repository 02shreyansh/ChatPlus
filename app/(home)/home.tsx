import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { homeStyles } from '@/styles/homeStyles'
import HomeHeader from '@/components/home/HomeHeader'
import ChatList from '@/components/home/ChatList'
import { router } from 'expo-router'
import {Ionicons} from "@expo/vector-icons"
import { RFValue } from 'react-native-responsive-fontsize'
const Page = () => {
  return (
    <View style={homeStyles.container}>
      <HomeHeader/>
      <ChatList/>
      <TouchableOpacity onPress={()=>router.navigate('/(home)/contacts')} style={homeStyles.absoluteButton}>
        <Ionicons name='chatbubble-sharp' size={RFValue(20)} color={"#fff"}/>
      </TouchableOpacity>
    </View>
  )
}

export default Page