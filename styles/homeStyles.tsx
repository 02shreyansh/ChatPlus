import { Colors, screenHeight, screenWidth } from "@/utils/Constants";
import { Platform, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary
    },
    headerContainer: {
        backgroundColor: Colors.tertiary,
        paddingTop:25
    },
    flexRowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    flexRowGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    title: {
        fontWeight: '500'
    },
    requestDot: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: RFValue(8),
        height: RFValue(8),
        backgroundColor: '#FF3812',
        borderRadius: 7.5,
        borderWidth: 1,
        borderColor: '#fff',
    },
    emptyContainer: {
        height: screenHeight * 0.6,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 20,
        alignItems: 'center',
        resizeMode: 'cover',
    },
    lottie: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.3
    },
    welcomeTitle: {
        fontWeight: "600"
    },
    welcomeSubTitle: {
        opacity: 0.7,
        marginTop: 10,
        fontWeight: "600"
    },
    absoluteButton: {
        position: 'absolute',
        bottom: Platform.OS == 'ios' ? 40 : 20,
        right:10,
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 100
    }
})