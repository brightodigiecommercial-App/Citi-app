import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Confetti } from 'react-native-fast-confetti';

const ConfettiOverlay = () => {
  return (
    <View style={styles.overlay} pointerEvents="none">
      <Confetti
        isActive={true}
        duration={3000}
        particleCount={150}
        colors={['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']}
        gravity={0.8}
        wind={0.2}
        fadeOut={true}
        autoStart={true}
        blastRadius={300}
        particleSize={8}
        streamers={true}
        streamerSize={12}
        streamerLength={20}
        streamerWidth={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    pointerEvents: 'none',
  },
});

export default ConfettiOverlay;
