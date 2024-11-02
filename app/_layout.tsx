import {useFonts} from "expo-font"
import { useEffect } from "react"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { Colors } from "@/utils/Constants"
import { Stack } from "expo-router"
SplashScreen.preventAutoHideAsync()
export default function RootLayout(){
    const [loaded]=useFonts({
        SpaceMono:require('@/assets/fonts/SpaceMono-Regular.ttf')
    })
    useEffect(()=>{
        if(loaded){
            SplashScreen.hideAsync()
        }
    },[loaded])
    if(!loaded){
        return null
    }
    return (
        <>
            <StatusBar style="light" backgroundColor={Colors.tertiary} translucent/>
            <Stack screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="(auth)"/>
            </Stack>
        </>
    )
}