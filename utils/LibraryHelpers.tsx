import * as ImagePicker from 'expo-image-picker';
import { Href, router } from 'expo-router';

export const launchCamera = async (): Promise<any> => {
    try {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            return null;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.1,
        });

        if (!result.canceled && result.assets?.length) {
            return { uri: result.assets[0].uri, name: result.assets[0].fileName, type: result.assets[0].mimeType };
        }

        return null;
    } catch (error) {
        return null;
    }
};

export const launchGallery = async (): Promise<any> => {
    try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            return null;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.1
        });

        if (!result.canceled && result.assets?.length) {
            return { uri: result.assets[0].uri, name: result.assets[0].fileName, type: result.assets[0].mimeType };
        }

        return null;
    } catch (error) {
        return null;
    }
};




export const resetAndNavigate = (newPath: Href<string | object>) => {
    if (router.canGoBack()) {
        router.dismissAll();
    }
    router.replace(newPath);
}