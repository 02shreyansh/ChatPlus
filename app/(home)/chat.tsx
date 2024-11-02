import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { chatStyles } from '@/styles/chatStyles'
import ChatHeader from '@/components/chat/ChatHeader'
import Chat from '@/components/chat/Chat'
import SendButton from '@/components/chat/SendButton'
import { usePaginatedChats } from '@/service/api/chatService'
import { useChatStore } from '@/service/chatStore'

const Page = () => {
  const route=useRoute() as any
  const item=route?.params
  const [heightOfMessageBox,setHeightOfMessageBox]=useState(0)
  const [isTyping,setIsTyping]=useState(false)
  const {loadMoreChats,loading,hasMoreChats}=usePaginatedChats(item?.conversation_id)
  const {conversations}=useChatStore()
  const currentChat=conversations?.find(convo=>convo.conversationId===item?.conversation_id);
  useEffect(()=>{
    if(!loading && hasMoreChats){
      loadMoreChats()
    }
  },[])
  return (
    <View style={chatStyles.container}>
      <ChatHeader item={item}/>
      <Image source={require('@/assets/images/pattern.png')} style={chatStyles.background}/>
      <Chat
        heightOfMessageBox={heightOfMessageBox}
        messages={currentChat?.messages || []}
        onLoadMore={()=>!loading && hasMoreChats && loadMoreChats}
        loading={loading}
      />
      <SendButton
      item={item}
      isTyping={isTyping}
      setHeightOfMessageBox={setHeightOfMessageBox}
      setIsTyping={setIsTyping}
      />
    </View>
  )
}

export default Page