import { WSProvider } from "@/service/sockets/WSProvider";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications"
import { useEffect, useRef } from "react";
import { registerForPushNotificationsAsync } from "@/utils/NotificationHandler";
import { registerDeviceToken } from "@/service/api/authService";
Notifications.setNotificationHandler({
    handleNotification:async()=>({
        shouldShowAlert:true,
        shouldPlaySound:false,
        shouldSetBadge:false
    })
})
const Layout=()=>{
     const notificationListner=useRef<Notifications.Subscription>()
     const responseListner=useRef<Notifications.Subscription>()

     useEffect(()=>{
        registerForPushNotificationsAsync()
        .then(async (token)=>await registerDeviceToken(token ?? ""))
        .catch((error:any)=>console.log("Error In notification",error)
        )

        notificationListner.current=Notifications.addNotificationReceivedListener(notification=>{
            console.log(notification);
        })

        notificationListner.current=Notifications.addNotificationResponseReceivedListener(notification=>{
            console.log(notification);
        })
        return ()=>{
            notificationListner.current && 
            Notifications.removeNotificationSubscription(notificationListner.current)
            responseListner.current && Notifications.removeNotificationSubscription(responseListner.current)
        }
     },[])

    return (
        <WSProvider>
            <Stack screenOptions={{
            headerShown:false
             }}>
                <Stack.Screen name="home"/>
                <Stack.Screen name="profile"/>
                <Stack.Screen name="contacts"/>
                <Stack.Screen name="chat"/>
                <Stack.Screen name="notification"/>
                <Stack.Screen name="search"/>
            </Stack>
        </WSProvider>
        
    )
}
export default Layout