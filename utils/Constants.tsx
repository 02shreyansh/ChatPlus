import { Dimensions } from "react-native";

export const screenHeight = Dimensions.get('screen').height
export const screenWidth = Dimensions.get('screen').width

export enum Colors {
    primary = "#70B3E5",
    secondary = '#1E2732',
    tertiary = '#242D39',
    light = 'rgba(255,255,255,0.4)'
}