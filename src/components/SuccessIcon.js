import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SuccessIcon = ({ size = 100, color = '#00C851' }) => {
  const scaleValue = new Animated.Value(0);
  
  React.useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          width: size, 
          height: size, 
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ scale: scaleValue }],
        }
      ]}
    >
      <View style={styles.checkmark}>
        <View style={[styles.checkLeft, { height: size * 0.25 }]} />
        <View style={[styles.checkRight, { height: size * 0.45 }]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00C851',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  checkmark: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
    marginRight: 4,
  },
  checkLeft: {
    width: 4,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
    marginRight: -2,
    borderRadius: 2,
  },
  checkRight: {
    width: 4,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '-45deg' }],
    marginLeft: -2,
    borderRadius: 2,
  },
});
