import { View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import dayjs from 'dayjs';
import TickIcon from '@/assets/icons/tick.png';
import LoadingDots from './LoadingDots';
import CustomText from '../ui/CustomText';
import { messageBubbleStyles } from '@/styles/messageBubbleStyles';
import { useAuthStore } from '@/service/authStore';

const MessageBubble: FC<{ message: any }> = ({ message }) => {
    const { user } = useAuthStore()
    const isMyMessage = message.sender?._id == user?.id;
    const isMessageRead = message?.isMessageRead;
    return (
        <View
            style={{
                ...messageBubbleStyles.messageContainer,
                maxWidth: isMyMessage ? '80%' : '92%',
                alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
                backgroundColor: isMyMessage ? '#683EF3' : '#232E3B',
                borderBottomRightRadius: isMyMessage ? 0 : 20,
                borderBottomLeftRadius: isMyMessage ? 20 : 0,
            }}>
            {!isMyMessage && (
                <View
                    style={{
                        ...messageBubbleStyles.leftMessageArrow,
                        display: isMyMessage ? 'none' : 'flex',
                    }}></View>
            )}
            {message?.isTyping ? (
                <LoadingDots />
            ) : message?.imageUri ? (
                <Image source={{ uri: message?.content }} style={messageBubbleStyles.img} />
            ) : (
                <CustomText
                    style={{
                        ...messageBubbleStyles.messageText,
                        left: isMyMessage ? 10 : 0,
                        textAlign: 'left'
                    }}
                >
                    {message.content}
                </CustomText>
            )}

            {isMyMessage && (
                <View
                    style={{
                        ...messageBubbleStyles.rightMessageArrow,
                        display: isMyMessage ? 'flex' : 'none',
                    }}></View>
            )}

            <View style={{ ...messageBubbleStyles.timeAndReadContainer, right: 0 }}>
                <Text style={messageBubbleStyles.timeText}>
                    {dayjs(message.createdAt).format('HH:mm A')}
                </Text>
                {isMyMessage && (
                    <View>
                        <Image
                            source={TickIcon}
                            tintColor={isMessageRead ? '#53a6fd' : '#8aa69b'}
                            style={{ width: 15, height: 15 }}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};



export default MessageBubble;
