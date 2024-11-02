import { useState } from "react";
import { useChatStore } from "../chatStore";
import { appAxios } from "./apiInterceptor";
export const getAllConversations=async()=>{
    try {
        const apiRes=await appAxios.get(`/chat`);
        const {setConversations} =useChatStore.getState()
        setConversations(apiRes.data)
    } catch (error) {
        console.log("Get All Conversations",error);
    }
}

export const fetchPaginatedChats=async(conversationId:string,page:number=1)=>{
    try {
       const response=await appAxios.get(`/chat/paginated-chats?conversationId=${conversationId}&page=${page}`) 
       return response.data
    } catch (error) {
        console.log("Error Fetching Chats",error);
        return null
    }
}
const updateChatStore=(conversationId:string,newMessages:any[])=>{
    const {setConversations,conversations} =useChatStore.getState()
    const updatedConversations=conversations.map((convo:any)=>{
        if(convo.conversationId=== conversationId){
            const existingMessageIds=new Set(convo.messages.map((msg:any)=>msg.id))
            const uniqueNewMessages=newMessages.filter((msg:any)=>!existingMessageIds.has(msg.id));
            const allMessages=[...uniqueNewMessages,...convo.messages];
            const sortedMessages=allMessages.sort((a:any,b:any)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

            return {
                ...convo,
                messages:sortedMessages
            }
        }
        return convo
    })
    setConversations(updatedConversations)
}

export const usePaginatedChats=(conversationId:string)=>{
    const [page,setPage]=useState(1)
    const [loading,setLoading]=useState(false)
    const [hasMoreChats,setHasMoreChats]=useState(true);

    const loadMoreChats=async()=>{
        if(loading || !hasMoreChats) return;
        setLoading(true)
        const data=await fetchPaginatedChats(conversationId,page)
        if(data && data.messages.length>0){
            updateChatStore(conversationId,data.messages);
            setPage(page+1)
        }else{
            setHasMoreChats(false)
        }
        setLoading(false)
    }
    return {loadMoreChats,loading,hasMoreChats}
}