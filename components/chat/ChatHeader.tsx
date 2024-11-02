import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { homeStyles } from '@/styles/homeStyles'
import UserAvatar from '../ui/UserAvatar'
import CustomText from '../ui/CustomText'
import { Ionicons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { chatStyles } from '@/styles/chatStyles'
import { router } from 'expo-router'
import { getLastSeenMessage } from '@/utils/CalculationHelpers'
import { useUserStatus } from '@/service/sockets/useUserStatus'
import { useWS } from '@/service/sockets/WSProvider'



const ChatHeader: FC<{ item: any }> = ({ item }) => {
    const { isOnline, lastSeen } = useUserStatus(item?.id);
    const socketService = useWS()
    return (
        <View style={homeStyles.headerContainer}>
            <SafeAreaView />
            <View style={homeStyles.flexRowBetween}>
                <View style={chatStyles.flexRowGap}>
                    <TouchableOpacity onPress={() => {
                        router.back()
                        socketService.emit('TYPING', { conversationId: item.conversation_id, isTyping: false });
                    }}>
                        <Ionicons name="arrow-back-outline" size={RFValue(20)} color="#fff" />
                    </TouchableOpacity>
                    <UserAvatar user={item} size='small' />
                    <View >
                        <CustomText style={chatStyles.name} variant='h5'>{item?.full_name}</CustomText>
                        <CustomText style={chatStyles.liveStatus}>{isOnline ? "Online" : getLastSeenMessage(lastSeen)}</CustomText>
                    </View>
                </View>

                <View style={chatStyles.flexRowGap}>
                    <TouchableOpacity>
                        <Ionicons name="call" size={RFValue(20)} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-vertical" size={RFValue(20)} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default ChatHeader