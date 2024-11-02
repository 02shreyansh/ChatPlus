import { Platform, StyleSheet } from 'react-native';
import { Colors } from '@/utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

export const signupStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover'
    },
    instructions: {
        marginTop: 5,
        marginBottom: 20,
        fontWeight: '700',
        opacity: 0.5
    },
    submitButton: {
        backgroundColor: Colors.primary,
        borderRadius: 100,
        height: 60,
        width: 60,
        alignItems: 'center',
        alignSelf: 'flex-end',
        padding: 15,
        justifyContent: 'center',
    },
    cameraIcon: {
        backgroundColor: Colors.primary,
        justifyContent: "center",
        overflow:'hidden',
        alignItems: 'center',
        height: RFValue(60),
        width: RFValue(60),
        borderRadius: 120,
        alignSelf: 'center'
    },
    profileText: {
        fontWeight: '700',
        marginTop: 10,
    },
    termsText: {
        width: '50%',
        textAlign: 'left',
        fontWeight: '700',
        opacity: 0.6
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: "absolute",
        width: '100%',
        bottom: Platform.OS === 'ios' ? 40 : 10,
        alignSelf: 'center'
    },

});
