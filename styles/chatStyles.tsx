import { Colors } from "@/utils/Constants";
import { StyleSheet } from "react-native";

export const chatStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001A28'
    },
    name: {
        textAlign: 'left',
        fontWeight: '600'
    },
    liveStatus: {
        textAlign: 'left',
        color: Colors.primary
    },
    flexRowGap: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 12
    },
    background: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        position: "absolute",
        zIndex: -1,
        tintColor: 'rgba(255,255,255,0.05)'
    },
    
})