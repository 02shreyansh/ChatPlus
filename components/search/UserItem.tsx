import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { searchStyles } from '@/styles/searchStyles'
import UserAvatar from '../ui/UserAvatar'
import CustomText from '../ui/CustomText'
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

const UserItem: FC<{ item: any, onSendRequests?: () => void, onUnfriend?: () => void }> = ({ item, onSendRequests, onUnfriend }) => {

    return (
        <View style={searchStyles.userContainer}>
            <TouchableOpacity
                disabled={!item.is_connected}
                onPress={() => router.navigate({
                    pathname: '/(home)/chat',
                    params: item
                })}
                style={searchStyles.flexRowGap}
            >
                <UserAvatar size='small' user={item} />
                <View>
                    <CustomText style={searchStyles.name}>{item?.full_name}</CustomText>
                    <CustomText style={searchStyles.username}>@{item?.username}</CustomText>
                </View>
            </TouchableOpacity>

            {
                item?.is_connected &&
                <TouchableOpacity onPress={onUnfriend}>
                    <MaterialCommunityIcons name="chat-remove" size={RFValue(22)} color="red" />
                </TouchableOpacity>
            }


            {
                !item?.is_connected && item.is_requested &&
                <CustomText style={searchStyles.sentText}>Requested</CustomText>
            }


            {
                !item?.is_connected && !item.is_requested &&
                <TouchableOpacity onPress={onSendRequests}>
                    <MaterialCommunityIcons name="chat-plus" size={RFValue(22)} color="#0FFF6E" />
                </TouchableOpacity>
            }



        </View >
    )
}

export default UserItem