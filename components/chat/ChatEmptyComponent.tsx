import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '@/utils/Constants'
import CustomText from '../ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { chatEmptyStyles } from '@/styles/chatEmptyStyles'

const ChatEmptyComponent = () => {
    return (
        <ScrollView contentContainerStyle={chatEmptyStyles.container}>
            <Image source={require('@/assets/images/empty.png')} style={chatEmptyStyles.img} />
            <CustomText style={chatEmptyStyles.text}>Let's start the legendary conversation!</CustomText>
        </ScrollView>
    )
}


export default ChatEmptyComponent