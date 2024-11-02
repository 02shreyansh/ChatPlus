import { View, FlatList,RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { searchStyles } from '@/styles/searchStyles'
import SearchBar from '@/components/search/SearchBar'
import NotificationItem from '@/components/search/NotificationItem'
import { useUserStore } from '@/service/userStore'
import { getAllFriendRequests,onHandleRequest } from '@/service/api/userService'
import CustomText from '@/components/ui/CustomText'
import { getAllConversations } from '@/service/api/chatService'
const Page = () => {
  const {requests} =useUserStore()
  const [searchQuery,setSearchQuery]=useState('')
  const [isRefreshing,setIsRefreshing]=useState(false)
  const renderUsers=({item}:any)=>{
    return(
      <NotificationItem
        onAcceptRequest={async ()=>{
          await onHandleRequest(item?._id,'ACCEPT')
          getAllFriendRequests()
          getAllConversations()
        }}
        onRejectRequest={async ()=>{
          await onHandleRequest(item?._id,'REJECT')
          getAllFriendRequests()
        }}
        item={item}
      />
    )
  }
  useEffect(()=>{
    getAllFriendRequests()
  },[])
  const refreshHandler=async ()=>{
    setIsRefreshing(true)
    await getAllFriendRequests()
    setIsRefreshing(false)
  }
  return (
    <View style={searchStyles.container}>
      <SearchBar title='Notifications' searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

      <FlatList
      data={requests}
      refreshControl={<RefreshControl
        refreshing={isRefreshing}
        onRefresh={refreshHandler}
      />}
      ListEmptyComponent={<CustomText>No new request!</CustomText>}
      renderItem={renderUsers}
      keyExtractor={(item:any)=>item._id}
      initialNumToRender={5}
      contentContainerStyle={searchStyles.scrollContainer}
      />
    </View>
  )
}

export default Page