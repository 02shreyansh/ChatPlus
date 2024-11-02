import { Colors } from "@/utils/Constants";
import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        margin: 10
    },
    name: {
        fontWeight: "500",
        marginTop: 20
    },
    username: {
        fontWeight: "700",
        color: Colors.primary,
    },
    btn: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
        margin: 10
    },
    text: {
        width: '70%',
        textAlign: 'left'
    }
})