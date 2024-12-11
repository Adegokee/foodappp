import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AnimatedApiExample = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 1000, // 1 second
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fully transparent
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, { opacity: fadeAnim }]} />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={fadeIn}>
          <Text style={styles.buttonText}>Fade In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fadeOut}>
          <Text style={styles.buttonText}>Fade Out</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default AnimatedApiExample;
