import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserItem from '@/components/search/UserItem'
import { addFriend, searchUsers, unfriend } from '@/service/api/userService'
import { getAllConversations } from '@/service/api/chatService'
import { searchStyles } from '@/styles/searchStyles'
import SearchBar from '@/components/search/SearchBar'

const Page = () => {
  const [searchQuery,setSearchQuery]=useState('')
  const [searchData,setSearchData]=useState([])
  const renderUsers=({item}:any)=>{
    return(
      <UserItem
      onSendRequests={async ()=>{
        await addFriend(item?.id)
        searchUser()
      }}
      onUnfriend={async ()=>{
        await unfriend(item?.id)
        searchUser()
        await getAllConversations()
      }}
      item={item}
      />
    )
  }

  const searchUser=async()=>{
    const data=await searchUsers(searchQuery)
    setSearchData(data)
  }

  useEffect(()=>{
    if(searchQuery.length>3){
      searchUser()
    }
  },[searchQuery])

  useEffect(()=>{
    getAllConversations()
  },[])
  return (
    <View style={searchStyles.container}>
      <SearchBar title='Search' searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <FlatList 
      data={searchData}
      renderItem={renderUsers}
      keyExtractor={(item:any)=>item.id}
      initialNumToRender={5}
      contentContainerStyle={searchStyles.scrollContainer}
      />
    </View>
  )
}

export default Page