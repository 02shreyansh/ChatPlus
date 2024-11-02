import { screenHeight, screenWidth } from "@/utils/Constants";
import { StyleSheet } from "react-native";

export const siginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: 10
    },
    message: {
        marginTop: 10,
        fontWeight: '600',
        opacity: 0.6
    },
    title: {
        fontWeight: '600',
    },
    animation: {
        height: screenHeight * 0.3,
        width: screenWidth * 0.8,
        resizeMode: 'contain'
    },
    loginBtn: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginTop: 140,
        width: '90%',
        flexDirection: 'row',
    },
    loginBtnText: {
        fontWeight: '700',
        marginHorizontal: 20,
        color: '#222'
    },
    googleIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
})