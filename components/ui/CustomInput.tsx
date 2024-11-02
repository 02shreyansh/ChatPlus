import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Animated, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@/utils/Constants';

interface CustomInputProps extends TextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    validationFunction?: any;
    showValidationIcon?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    value,
    onChangeText,
    onBlur,
    validationFunction = null,
    showValidationIcon = false,
    placeholder,
    secureTextEntry = false,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const labelAnim = useRef(new Animated.Value(0)).current;

    const checkValidation = async () => {
        if (validationFunction && showValidationIcon) {
            setIsValid(await validationFunction(value));
        }
    }

    useEffect(() => {
        checkValidation()
    }, [value, validationFunction, showValidationIcon]);

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(labelAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!value) {
            Animated.timing(labelAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    };

    const labelStyle = {
        top: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [RFValue(12), RFValue(-7)],
        }),
        fontSize: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [RFValue(12), RFValue(10)],
        }),
    };

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[
                    styles.label,
                    labelStyle,
                    {
                        color: isFocused ? Colors.primary : '#666',
                        fontWeight: isFocused ? '700' : '500',
                    },
                ]}
            >
                {label}
            </Animated.Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={isFocused ? '' : placeholder}
                    secureTextEntry={secureTextEntry}
                    style={[
                        styles.input,
                        {
                            borderColor: isFocused ? Colors.primary : '#666',
                            borderWidth: isFocused ? 2 : 1,
                        },
                    ]}
                    {...rest}
                />
                {showValidationIcon && value.length > 0 && (
                    <Ionicons
                        name={isValid ? 'checkmark-circle' : 'close-circle'}
                        size={RFValue(20)}
                        color={isValid ? '#05FF67' : '#FF5D25'}
                        style={styles.icon}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        position: 'absolute',
        left: 10,
        pointerEvents: 'none',
        color: '#666',
        zIndex: 11,
        backgroundColor: Colors.secondary,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 10,
        paddingVertical: RFValue(10),
        paddingHorizontal: RFValue(10),
        height: 50,
        fontSize: RFValue(14),
        color: '#fff',
    },
    icon: {
        marginLeft: 10,
    },
});

export default CustomInput;
