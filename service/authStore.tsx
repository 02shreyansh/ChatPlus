import {create} from "zustand"
import {persist,createJSONStorage} from "zustand/middleware"
import { mmkvStorage } from "./storage"
interface authState{
    user:Record<string,any> | null
    setUser:(user:any)=>void
    logout:()=>void,
    deviceTokenAdded:boolean,
    setDeviceTokenStatus:(value:boolean)=>void
}
export const useAuthStore=create<authState>()(
    persist(
        (set,get)=>({
            user:null,
            deviceTokenAdded:false,
            setUser:(data)=>set({user:data}),
            logout:()=>set({user:null,deviceTokenAdded:false}),
            setDeviceTokenStatus:(value)=>set({deviceTokenAdded:value})
        }),
        {
            name:"auth-storage",
            storage:createJSONStorage(()=>mmkvStorage)
        },
    ),
);