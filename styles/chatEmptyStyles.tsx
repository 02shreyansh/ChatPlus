import { screenHeight, screenWidth } from "@/utils/Constants";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const chatEmptyStyles = StyleSheet.create({
    container: {
        height: screenHeight * 0.4,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 120,
        height: 120,
        resizeMode: 'contain'
    },
    text: {
        fontWeight: '500',
        fontSize: RFValue(20)
    }
})
