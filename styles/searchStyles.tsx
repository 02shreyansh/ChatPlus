import { Colors } from "@/utils/Constants";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const searchStyles = StyleSheet.create({
    
    icon: {
        marginHorizontal: 10
    },
    name: {
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: 3,
    },
    sentText: {
        fontSize: RFValue(10),
        color: '#0FCF6E',
        fontWeight: '600'
    },
    username: {
        fontWeight: '600',
        color: Colors.primary,
        textAlign: 'left'
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: Colors.tertiary,
        padding: 10,
        borderRadius: 20
    },
    flexRowGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: "70%"
    },
    flexRowGap2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    titleContainer: {
        backgroundColor: Colors.tertiary,
        paddingVertical: 20,
        marginBottom: 20,
        paddingTop:35
    },
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        paddingTop:24
    },
    headerContainer: {
        backgroundColor: Colors.tertiary,
        paddingTop:12
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#222",
        marginVertical: 20,
        marginHorizontal: 10,
        borderRadius: 120,
        paddingHorizontal: 20
    },
    input: {
        width: '90%',
        height: 50,
        color: 'white',
    },
    scrollContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20
    }
})