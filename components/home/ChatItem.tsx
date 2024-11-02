import React, { FC } from 'react'
import { View, TouchableOpacity, Pressable } from 'react-native'
import { chatItemStyles } from '@/styles/chatItemStyles'
import UserAvatar from '../ui/UserAvatar'
import CustomText from '../ui/CustomText'
import { formatTimestamp } from '@/utils/CalculationHelpers'
import { gestureHandlerRootHOC, Swipeable } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const ChatItem: FC<{ item: any }> = ({ item }) => {
    const renderRightActions = () => {
        return (
            <View style={chatItemStyles.rightActionContainer}>
                <TouchableOpacity onPress={() => console.log('Delete pressed')} style={chatItemStyles.deleteButton}>
                    <MaterialCommunityIcons name="delete" size={RFValue(22)} color="#fff" />
                </TouchableOpacity>
            </View>
        )
    }

    const navigateItem = {
        conversation_id: item.conversationId,
        full_name: item?.otherParticipant?.full_name,
        id: item?.otherParticipant?.id,
        profile_picture: item?.otherParticipant?.profile_picture,
        username: item?.otherParticipant?.username
    };
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <Pressable
                onPress={() => {
                    router.navigate({
                        pathname: '/(home)/chat',
                        params: navigateItem
                    });
                }}
                style={chatItemStyles.container}>
                <View style={chatItemStyles.avatarContainer}>
                    <UserAvatar size='small' user={item?.otherParticipant} />
                </View>

                <View style={chatItemStyles.messageContainer}>
                    <View style={chatItemStyles.flexRowBetween}>
                        <CustomText style={chatItemStyles.name} numberOfLines={1}>{item?.otherParticipant?.full_name}</CustomText>
                        <CustomText style={chatItemStyles.time}>
                            {item?.messages![0] ? formatTimestamp(item?.messages![0]?.createdAt) : ''}
                        </CustomText>
                    </View>

                    <View style={chatItemStyles.flexRowBetween}>
                        {item?.is_typing ?
                            <CustomText style={chatItemStyles.time} numberOfLines={1}>Typing...</CustomText>
                            :
                            <CustomText style={chatItemStyles.message} numberOfLines={1}>{item?.messages![0]?.content}</CustomText>

                        }
                        {item?.unreadMessages
                            ?
                            <View style={chatItemStyles.unreadNotification}>
                                <CustomText>{item?.unreadMessages}</CustomText>
                            </View>
                            :
                            null
                        }
                    </View>

                </View>

            </Pressable>
        </Swipeable>
    )
}

export default gestureHandlerRootHOC(ChatItem)
