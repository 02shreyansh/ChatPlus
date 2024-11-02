import { View, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { homeStyles } from '@/styles/homeStyles'
import CustomText from '../ui/CustomText'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { router } from 'expo-router'
import {getAllFriendRequests} from "@/service/api/userService"
import { useUserStore } from '@/service/userStore'

const HomeHeader = () => {

    const { requests } = useUserStore()




    const fetchIncomingRequests = async () => {
        await getAllFriendRequests()
    }

    useEffect(() => {
        fetchIncomingRequests()
    }, [])

    return (
        <View style={homeStyles.headerContainer}>
            <SafeAreaView />
            <View style={homeStyles.flexRowBetween}>
                <View style={homeStyles.flexRowGap}>
                    <FontAwesome name="user-circle-o" size={RFValue(26)} color="#fff" onPress={()=>router.navigate('/(home)/profile')} />
                    <CustomText style={homeStyles.title} variant='h5'>Chat+</CustomText>
                </View>

                <View style={homeStyles.flexRowGap}>
                    <TouchableOpacity onPress={() => router.navigate('/(home)/notification')}>
                        <Ionicons name="notifications" size={RFValue(20)} color="#fff" />
                        {requests?.length > 0 && (
                            <View style={homeStyles.requestDot} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.navigate('/(home)/search')}>
                        <Ionicons name="search" size={RFValue(20)} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default HomeHeader