import { View,  SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserItem from '@/components/search/UserItem'
import { connectedFriends, unfriend } from '@/service/api/userService'
import { getAllConversations } from '@/service/api/chatService'
import { friendStyles } from '@/styles/friendStyles'
import { searchStyles } from '@/styles/searchStyles'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import CustomText from '@/components/ui/CustomText'
import AlphabetList from "@raiden16f7/react-native-alphabet-list"
import { Colors } from '@/utils/Constants'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

const Page = () => {
  const [isRefreshing,setIsRefreshing]=useState(false)
  const [userData,setUserData]=useState([])
  const renderItem=({item}:any)=>{
    return (
      <UserItem
        item={item}
        onUnfriend={async ()=>{
          await unfriend(item?.id)
          fetchConnections()
          await getAllConversations()
        }}
      />
    )
  }
  const fetchConnections=async()=>{
    const data=await connectedFriends()
    const updatedUserData=data?.map((user:any)=>({
      ...user,
      key:user?.full_name?.charAt(0).toLowerCase() as CharType,
      is_connected:true
    }))
    setUserData(updatedUserData)
  }
  useEffect(()=>{
    fetchConnections()
  },[])
  const refreshHandler=async()=>{
    setIsRefreshing(true)
    await fetchConnections()
    setIsRefreshing(false)
  }
  return (
    <View style={friendStyles.container}>
      <View style={searchStyles.titleContainer}>
        <SafeAreaView/>
        <View style={searchStyles.flexRowGap2} >
          <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name='arrow-back-outline' style={searchStyles.icon} size={24} color={"#fff"}/>
          </TouchableOpacity>
          <CustomText variant='h4' style={searchStyles.name}>Contacts</CustomText>
        </View>
      </View>
      {userData?.length>0 ?(
        <AlphabetList
          data={userData}
          refreshControl={<RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshHandler}
          />}
          renderItem={renderItem}
          lineWidth={0}
          trackSize={0}
          trackScale={1.2}
          contentContainerStyle={{padding:5}}
          textColorActive={Colors.primary}
        />
      ):(
        <CustomText variant='h5' style={[searchStyles.name ,{
          margin:10
        }]}>No Data...</CustomText>
      )}
    </View>
  )
}

export default gestureHandlerRootHOC(Page) 