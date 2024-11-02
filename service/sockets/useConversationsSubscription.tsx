import { useWS } from "./WSProvider";
import { useChatStore } from "../chatStore";
import { useAuthStore } from "../authStore";
import { useEffect } from "react";
export const useConversationsSubscription=()=>{
    const socketService=useWS()
    const {conversations,setConversations}=useChatStore()
    useEffect(()=>{
        if(!socketService) return;
        const conversationIds=conversations.map(convo=> convo.conversationId)
        if(conversationIds.length>0){
            socketService.emit('subscribeToConversations',conversationIds)
        }

        const handleNewMessage=({message,conversationId}:any)=>{
            const updatedConversations=conversations?.map((convo:any)=>{
                if(convo.conversationId === conversationId){
                    return {
                        ...convo,
                        messages:[message,...convo.messages]
                    }
                }
                return convo
            })
            setConversations(updatedConversations)
        }
        const handleMessageSeen=({messageId,conversationId,userId}:any)=>{
            const updatedConversations=conversations?.map((convo:any)=>{
                if(convo.conversationId===conversationId){
                    return {
                        ...convo,
                        messages:convo.messages.map((msg:any)=>{
                            if(msg._id===messageId){
                                return {...msg,is_seen:true}
                            }
                            return msg
                        })
                    }
                }
                return convo
            })
            setConversations(updatedConversations)
        }
        const handleTypingStatus=({
            conversationId,
            userId,
            isTyping
        }:any)=>{
            const {user}=useAuthStore.getState()
            const updatedConversations=conversations?.map((convo:any)=>{
                if(convo.conversation_id===conversationId){
                    if(isTyping){
                        const existingTypingMessage=convo.messages.find((message:any)=>message?.isTyping && message?.sender=== userId)
                        if(!existingTypingMessage){
                            const typingMessage={
                                sender:userId,
                                type:"TEXT",
                                content:"",
                                id:conversations?.length+1,
                                createdAt:new Date(),
                                is_seen:false,
                                isDeleted:false,
                                is_delivered:false,
                                deletedFor:[],
                                isTyping:true,
                            }
                            convo.is_typing=true
                            convo.messages.unshift(typingMessage)
                        }
                    }else{
                        convo.is_typing=false;
                        convo.messages=convo.messages.filter(
                            (message:any)=>!(message.is_typing && message.sender===userId)
                        )
                    }
                }
                return convo;
            })
            setConversations(updatedConversations)
        }
        socketService.on('NEW_MESSAGE',handleNewMessage)
        socketService.on('MESSAGE_SEEN',handleMessageSeen)
        socketService.on('TYPING_STATUS',handleTypingStatus)
        return ()=>{
            socketService.off('NEW_MESSAGE');
            socketService.off('MESSAGE_SEEN');
            socketService.off('TYPING_STATUS')
        }
    },[conversations,setConversations,socketService])

}