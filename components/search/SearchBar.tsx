import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { searchStyles } from '@/styles/searchStyles'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@/utils/Constants';
import CustomText from '../ui/CustomText';
import { router } from 'expo-router';

interface SearchInputProps {
    searchQuery: string;
    setSearchQuery: (text: string) => void
    title: string
}

const SearchBar: FC<SearchInputProps> = ({ searchQuery, setSearchQuery, title }) => {
    return (
        <View style={searchStyles.headerContainer}>
            <SafeAreaView />
            <View style={searchStyles.flexRowGap}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-outline" style={searchStyles.icon} size={24} color="#fff" />
                </TouchableOpacity>
                <CustomText variant='h4' style={searchStyles.name}>{title}</CustomText>
            </View>
            <View style={searchStyles.inputContainer}>
                <TextInput
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    placeholderTextColor='#ccc'
                    style={searchStyles.input}
                    placeholder='Search by username,name'
                />
                <MaterialIcons name="search" size={RFValue(20)} color={Colors.light} />
            </View>
        </View>
    )
}

export default SearchBar

