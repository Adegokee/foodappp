import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const ReanimatedExample = () => {
  const boxOffset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: boxOffset.value }],
    };
  });

  const moveBox = () => {
    boxOffset.value = withTiming(boxOffset.value === 0 ? 150 : 0, { duration: 1000 });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button title="Move Box" onPress={moveBox} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#007bff',
  },
});

export default ReanimatedExample;
