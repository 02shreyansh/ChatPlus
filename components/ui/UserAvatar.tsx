import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC, useMemo } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@/utils/Constants';
import { getRandomDarkColor } from '@/utils/CalculationHelpers';
import { useUserStatus } from '@/service/sockets/useUserStatus';

interface UserAvatarProps {
    user: any;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
}

const UserAvatar: FC<UserAvatarProps> = React.memo(({ user, size = 'medium', disabled }) => {
    const { isOnline } = useUserStatus(user?.id);
    const randomColor = useMemo(() => getRandomDarkColor(), [user?.full_name]);

    const avatarSize = useMemo(() => {
        return {
            small: RFValue(35),
            medium: RFValue(60),
            large: RFValue(80),
        }[size];
    }, [size]);

    const getInitials = (fullName: string | undefined) => {
        if (!fullName) return '';
        const nameParts = fullName.split(' ');
        const initials = nameParts[0]?.charAt(0) + (nameParts[1]?.charAt(0) || '');
        return initials.toUpperCase();
    };

    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.8}
            style={[styles.avatarContainer, { width: avatarSize, height: avatarSize }]}
        >
            {user?.profile_picture ? (
                <Image
                    source={{ uri: user?.profile_picture }}
                    style={[styles.avatarImage, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}
                />
            ) : (
                <View
                    style={[
                        styles.initialsContainer,
                        { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2, backgroundColor: randomColor },
                    ]}
                >
                    <Text style={[styles.initialsText, { fontSize: avatarSize / 3 }]}>{getInitials(user?.full_name)}</Text>
                </View>
            )}
            {isOnline && <View style={styles.onlineIndicator} />}
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    avatarContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatarImage: {
        resizeMode: 'cover',
    },
    initialsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    initialsText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: RFValue(10),
        height: RFValue(10),
        backgroundColor: '#24C939',
        borderRadius: 7.5,
        borderWidth: 2,
        borderColor: '#fff',
    },
});

export default UserAvatar;
