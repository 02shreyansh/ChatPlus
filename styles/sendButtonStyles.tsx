import { Colors } from "@/utils/Constants";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const windowHeight = Dimensions.get('window').height;


export const sendButtonStyles = StyleSheet.create({
    container: {
        minHeight: windowHeight * 0.06,
        maxHeight: windowHeight * 0.4,
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100%',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        alignContent: 'center',
        backgroundColor: Colors.secondary,

    },
    flexRowGap: {
        alignItems: 'center',
        gap: 15,
        flexDirection: 'row',
    },
    subContainer: {
        flex: 1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: Colors.secondary,
        width: '100%',
        alignItems: 'center'
    },
    inputContainer: {
        maxHeight: windowHeight * 0.2,
        margin: '1%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '1%',
        borderRadius: 20,
    },
    textInput: {
        width: '98%',
        paddingVertical: 10,
        marginHorizontal: '2%',
        fontSize: RFValue(13),
        color: '#fff',
    },
    sendButtonWrapper: {
        position: 'absolute',
        right: 0,
        bottom: 6,
        width: '11%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    emojiButton: {
        alignSelf: 'flex-end',
        bottom: 15
    },
    sendButton: {
        borderRadius: 42,
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
