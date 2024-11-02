import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '@/components/ui/CustomSafeAreaView'
import LottieView from "lottie-react-native"
import { siginStyles } from '@/styles/signinStyles'
import CustomText from '@/components/ui/CustomText'
import { signinWithGoogle } from '@/service/api/authService'
const Page = () => {
    const handleSignin=async()=>{
        await signinWithGoogle()
    }
  return (
    <CustomSafeAreaView style={siginStyles.container}>
      <LottieView
      autoPlay
      loop
      style={siginStyles.animation}
      source={require("@/assets/animations/telegram.json")}
      />
      <CustomText variant='h3' style={siginStyles.title}>
        Welcome to Chat+
      </CustomText>
      <CustomText  style={siginStyles.message}>
        Messages are heavily encrupted
      </CustomText>
      <TouchableOpacity style={siginStyles.loginBtn} onPress={handleSignin}>
        <Image
        source={require("@/assets/icons/google.png")}
        style={siginStyles.googleIcon}
        />
        <CustomText style={siginStyles.loginBtnText}>
            Sign in with Google
        </CustomText>
      </TouchableOpacity>
    </CustomSafeAreaView>
  )
}

export default Page