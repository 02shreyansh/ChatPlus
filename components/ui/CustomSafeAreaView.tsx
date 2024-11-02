import { View, ViewStyle, StyleSheet, SafeAreaView } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { Colors } from '@/utils/Constants'
interface CustomProps{
    children:ReactNode,
    style?:ViewStyle
}
const CustomSafeAreaView:FC<CustomProps> = ({children,style}) => {
  return (
    <View style={[styles.container,style]}>
      <SafeAreaView/>
      {children}
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.secondary
    }
})
export default CustomSafeAreaView