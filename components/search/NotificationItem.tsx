import { View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { searchStyles } from '@/styles/searchStyles'
import UserAvatar from '../ui/UserAvatar'
import CustomText from '../ui/CustomText'
import { router } from 'expo-router'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

const NotificationItem: FC<{ item: any; onAcceptRequest: () => void; onRejectRequest: () => void; }> = ({ item, onAcceptRequest, onRejectRequest }) => {
    return (
        <View style={searchStyles.userContainer}>
            <View
                style={searchStyles.flexRowGap}
            >
                <UserAvatar size='small' user={item?.sender} />
                <View>
                    <CustomText style={searchStyles.name}>{item?.sender?.first_name + " " + item?.sender?.last_name}</CustomText>
                    <CustomText style={searchStyles.username}>@{item?.sender?.username}</CustomText>
                </View>
            </View>



            {item?.status === "PENDING" ?
                <View style={searchStyles.flexRowGap2}>
                    <TouchableOpacity onPress={onRejectRequest}>
                        <Ionicons name="close-circle-sharp" size={RFValue(22)} color="#ed7e77" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onAcceptRequest}>
                        <Ionicons name="checkmark-circle" size={RFValue(22)} color="#77ed7f" />
                    </TouchableOpacity>
                </View>
                :
                <TouchableOpacity onPress={() => router.navigate(`/(home)/chat?id=${item?.sender?._id}`)}>
                    <MaterialIcons name="mark-chat-read" size={24} color="#ccc" />
                </TouchableOpacity>
            }



        </View>
    )
}

export default NotificationItem