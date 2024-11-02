import { View, FlatList, Dimensions, Platform, ActivityIndicator } from 'react-native';
import React, { FC } from 'react';
import useKeyboardOffsetHeight from './helpers/useKeyboardOffsetHeight';
import MessageBubble from './MessageBubble';
import ChatEmptyComponent from './ChatEmptyComponent';
import getMessageHeightOffset from './helpers/getMessageHeightOffset';

interface ChatProps {
    messages: any[];
    heightOfMessageBox: number;
    onLoadMore: () => void;
    loading: boolean;
}

const windowHeight = Dimensions.get('window').height;

const Chat: FC<ChatProps> = ({ messages, heightOfMessageBox, onLoadMore, loading }) => {
    const keyBoardOffsetHeight = useKeyboardOffsetHeight();

    const renderMessageBubble = ({ item }: any) => {
        return <MessageBubble message={item} />;
    };

    return (
        <View
            style={{
                height: Platform.OS === 'ios'
                    ? windowHeight * 0.75 -
                    keyBoardOffsetHeight * 1.0 -
                    getMessageHeightOffset(heightOfMessageBox, windowHeight)
                    : windowHeight * 0.82 -
                    keyBoardOffsetHeight * 1.0 -
                    getMessageHeightOffset(heightOfMessageBox, windowHeight),
            }}>
            {messages.length === 0 ? (
                <ChatEmptyComponent />
            ) : (
                <FlatList
                    data={[...messages]}
                    inverted
                    keyExtractor={(item: any) => item.id}
                    renderItem={renderMessageBubble}
                    onEndReached={onLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
                />
            )}
        </View>
    );
};

export default Chat;
