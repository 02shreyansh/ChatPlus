import {View, StyleSheet, Animated, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

const LoadingDots = () => {
  const [animatedValues] = useState(
    Array.from({length: 3}, () => new Animated.Value(1)),
  );

  useEffect(() => {
    startAnimation();
    return () => resetAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.stagger(
        100,
        animatedValues.map(val =>
          Animated.sequence([
            Animated.timing(val, {
              toValue: 0.5,
              duration: 500,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(val, {
              toValue: 1,
              duration: 500,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]),
        ),
      ),
    ).start();
  };

  const resetAnimation = () => {
    animatedValues.forEach(val => val.setValue(1));
  };

  return (
    <View style={styles.container}>
      {animatedValues.map((animatedValue, index) => {
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                transform: [{scale: animatedValue}],
                marginRight: 4,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    alignSelf: 'center',
    marginLeft: 20,
    height: 14,
  },
  dot: {
    width: RFValue(5),
    height: RFValue(5),
    borderRadius: 55,
    backgroundColor: '#fff',
  },
});

export default LoadingDots;
