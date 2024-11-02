import { Colors } from "@/utils/Constants";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const chatItemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex:22,
        backgroundColor:Colors.secondary
    },
    avatarContainer: {
        width: '15%',
        padding: 15,
    },
    messageContainer: {
        width: '80%',
        borderBottomWidth: 1,
        paddingRight: 15,
        paddingVertical: 10,
        borderBottomColor: '#000'
    },
    flexRowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
        justifyContent: 'space-between',
    },
    name: {
        fontWeight: '600',
        fontSize: RFValue(14)
    },
    time: {
        fontWeight: '600',
        opacity: 0.5,
        fontSize: RFValue(10)
    },
    unreadNotification: {
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 50,
        height: RFValue(16),
        paddingHorizontal: 6,
        backgroundColor: Colors.primary
    },
    message: {
        fontWeight: "500",
        opacity: 0.6,
        textAlign: 'left',
        fontSize: RFValue(13),
        width: '90%'
    },
    rightActionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '100%'
    },
    archiveButton: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '100%'
    },
    actionText: {
        color: 'white',
        fontWeight: 'bold',
    }
})