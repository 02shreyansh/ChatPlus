import { View, Dimensions, Animated, Platform, TextInput, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import useKeyboardOffsetHeight from './helpers/useKeyboardOffsetHeight';
import { Entypo, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Colors } from '@/utils/Constants';
import { sendButtonStyles } from '@/styles/sendButtonStyles';
import { useWS } from '@/service/sockets/WSProvider';


interface SendButtonProps {
    isTyping: boolean;
    setIsTyping: (item: any) => void;
    item: any;
    setHeightOfMessageBox: (item: any) => void
}

const windowHeight = Dimensions.get('window').height;

const SendButton: FC<SendButtonProps> = ({
    isTyping,
    setIsTyping,
    item,
    setHeightOfMessageBox,
}) => {
    const socketService = useWS()
    const animationValue = useRef(new Animated.Value(0)).current;
    const TextInputRef = useRef(null);
    const [message, setMessage] = useState('');
    const keyboardOffsetHeight = useKeyboardOffsetHeight();
    const handleTextChange = (text: any) => {
        setIsTyping(!!text);
        setMessage(text);
    };

    const handleContentSizeChange = (event: any) => {
        setHeightOfMessageBox(event.nativeEvent.contentSize.height);
    };

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: isTyping ? 1 : 0,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, [isTyping]);

    const sendButtonStyle = {
        opacity: animationValue,
        transform: [
            {
                scale: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                }),
            },
        ],
    };

    const handleFocus = () => {
        socketService.emit('TYPING', { conversationId: item.conversation_id, isTyping: true });
    };

    const handleBlur = () => {
        socketService.emit('TYPING', { conversationId: item.conversation_id, isTyping: false });
    };

    const handleSend = async () => {
        socketService.emit('TYPING', { conversationId: item.conversation_id, isTyping: false });
        socketService.emit('SEND_MESSAGE', { conversationId: item.conversation_id, type: "TEXT", content: message })
        setMessage('')
    }

    return (
        <View
            style={[
                sendButtonStyles.container,
                {
                    bottom:
                        Platform.OS === 'android'
                            ? windowHeight * 0
                            : Math.max(keyboardOffsetHeight, windowHeight * 0),
                },
            ]}>
            <View style={sendButtonStyles.subContainer}>
                <View style={sendButtonStyles.emojiButton}>
                    <FontAwesome6 name="smile" size={RFValue(20)} color={Colors.light} />
                </View>
                <View
                    style={[sendButtonStyles.inputContainer, { width: isTyping ? '80%' : '72%' }]}>
                    <TextInput
                        editable
                        ref={TextInputRef}
                        multiline
                        value={message}
                        placeholderTextColor='#eee'
                        style={sendButtonStyles.textInput}
                        placeholder="Message"
                        onChangeText={handleTextChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onContentSizeChange={handleContentSizeChange}
                    />
                </View>
                {isTyping ? (
                    <Animated.View style={[sendButtonStyles.sendButtonWrapper, sendButtonStyle]}>
                        <TouchableOpacity
                            style={sendButtonStyles.sendButton}
                            onPress={handleSend}>
                            <Ionicons name="send" size={RFValue(20)} color={Colors.primary} />
                        </TouchableOpacity>
                    </Animated.View>
                ) :
                    (
                        <View style={sendButtonStyles.flexRowGap}>
                            <Entypo name="attachment" size={RFValue(20)} color={Colors.light} />
                            <Ionicons name="mic-outline" size={RFValue(24)} color={Colors.light} />
                        </View>
                    )
                }
            </View>
        </View>
    )
}


export default SendButton