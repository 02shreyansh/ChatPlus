import {create} from "zustand"
import {persist,createJSONStorage} from "zustand/middleware"
import { mmkvStorage } from "./storage"
interface ChatStore{
    conversations:any[]
    setConversations:(data:any)=>void
    clearAllChats:()=>void
}

export const useChatStore=create<ChatStore>()(
    persist(
        (set,get)=>({
            conversations:[],
            setConversations:(data)=>set({conversations:data}),
            clearAllChats:()=>set({conversations:[]})
        }),
        {
            name:"chat-storage",
            storage:createJSONStorage(()=>mmkvStorage)
        }
    ),
);