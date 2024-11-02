import { useEffect, useState } from "react"
import { useWS } from "./WSProvider"

export const useUserStatus=(userId:string)=>{
    const [isOnline,setIsOnline]=useState<boolean>(false)
    const [lastSeen,setLastSeen]=useState<string>("Nobody Knows")
    const socketService=useWS()
    useEffect(()=>{
        if(socketService && userId){
            socketService?.emit('subscribeToUsers',[userId])
            socketService?.emit("GET_USER_STATUS",{userId})
            const handleStatusUpdate=(statusUpdate:{id:string; is_online:boolean; last_seen:string})=>{
                if(statusUpdate?.id === userId){
                    setIsOnline(statusUpdate?.is_online)
                    setLastSeen(statusUpdate?.last_seen)
                }
            }
            socketService.on('USER_LIVE_STATUS',handleStatusUpdate)
            return ()=>{
                socketService?.off("USER_LIVE_STATUS")
            }
        }
    },[userId,socketService])
    return {isOnline,lastSeen}
}