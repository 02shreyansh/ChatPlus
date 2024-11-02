import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '@/components/ui/CustomSafeAreaView'
import { router } from 'expo-router'
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons"
import { RFValue } from 'react-native-responsive-fontsize'
import { signupStyles } from '@/styles/signupStyles'
import { launchGallery } from '@/utils/LibraryHelpers'
import CustomText from '@/components/ui/CustomText'
import { uploadFile } from '@/service/api/fileService'
import { checkUsername, signUpWithGoogle } from '@/service/api/authService'
import CustomInput from '@/components/ui/CustomInput'
const Page = () => {
  const [username,setUsername]=useState("")
  const [profilePic,setProfilePic]=useState<any>('')
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [loading,setLoading]=useState(false)
  const createAccount=async()=>{
    if(!username || !firstName || ! lastName || !profilePic){
      Alert.alert("Error","Please Fill All Details")
      return;
    }
    setLoading(true)
    try {
      const mediaUrl=await uploadFile(profilePic)
      await signUpWithGoogle({
        username:username,
        first_name:firstName,
        last_name:lastName,
        profile_picture:mediaUrl
      })
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
  }
  const handleImagePick=async()=>{
    const res=await launchGallery()
    if(res){
      setProfilePic(res)
    }
  }
  const validateUsername=async(name:string)=>{
    if(name.length>4){
      const isValid=await checkUsername(name)
      return isValid
    }
    return false
  }
  return (
    <CustomSafeAreaView style={signupStyles.container}>
      <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name='arrow-back-outline' size={RFValue(20)} color={"#fff"}/>
      </TouchableOpacity>
      <TouchableOpacity style={signupStyles.cameraIcon} onPress={handleImagePick}>
        {profilePic?.uri ?
        <Image source={{uri:profilePic?.uri}} style={signupStyles.image}/> :
        <MaterialCommunityIcons name='camera-plus' size={RFValue(18)} color={"#fff"}/>
        }
      </TouchableOpacity>
      <CustomText variant='h4' style={signupStyles.profileText}>
        Profile Info
      </CustomText>
      <CustomText  style={signupStyles.instructions}>
        Enter Your Details
      </CustomText>

      <CustomInput
      label='Username'
      value={username}
      onChangeText={setUsername}
      showValidationIcon
      validationFunction={validateUsername}
      />

      <CustomInput
      label='First Name'
      value={firstName}
      onChangeText={setFirstName}
      />
      <CustomInput
      label='Last Name'
      value={lastName}
      onChangeText={setLastName}
      />


      <View style={signupStyles.footer}>
          <CustomText style={signupStyles.termsText}>
            By Signing Up , you agree to our Terms of Service and Privacy Policy
          </CustomText>
          <TouchableOpacity style={signupStyles.submitButton} onPress={createAccount}>
            {
              !loading ? 
              <MaterialCommunityIcons name='arrow-right' size={RFValue(24)} color={"#fff"}/>:
              <ActivityIndicator color={"#fff"} size={"small"}/>
            }
          </TouchableOpacity>
      </View>
    </CustomSafeAreaView>
  )
}

export default Page