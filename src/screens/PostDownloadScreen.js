import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import ConfettiOverlay from '../components/ConfettiOverlay';
import SuccessIcon from '../components/SuccessIcon';
import useAutoRedirect from '../hooks/useAutoRedirect';
import { useNavigationStore } from '../store/navigationStore';

const PostDownloadScreen = () => {
  const navigation = useNavigation();
  const { setHasSeenPostDownload } = useNavigationStore();
  const [confettiVisible, setConfettiVisible] = useState(true);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const pulseAnimation = useRef(null);
  
  const { markInteracted } = useAutoRedirect(() => {
    handleGetStarted();
  }, 6000);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const pulseTimer = setTimeout(() => {
      pulseAnimation.current = Animated.loop(
        Animated.sequence([
          Animated.timing(buttonScale, {
            toValue: 1.05,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(buttonScale, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.current.start();
    }, 5000);

    return () => {
      clearTimeout(pulseTimer);
      if (pulseAnimation.current) {
        pulseAnimation.current.stop();
      }
    };
  }, []);

  const handleGetStarted = async () => {
    markInteracted();
    if (pulseAnimation.current) {
      pulseAnimation.current.stop();
    }
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setHasSeenPostDownload(true);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {confettiVisible && <ConfettiOverlay />}
      
      <View style={styles.content}>
        <SuccessIcon />
        
        <View style={styles.textContainer}>
          <Text style={styles.headline}>
            Congratulations!
          </Text>
          <Text style={styles.subheadline}>
            CiTiApp download was successful
          </Text>
        </View>
      </View>

      <Animated.View 
        style={[
          styles.buttonContainer,
          { transform: [{ scale: buttonScale }] }
        ]}
      >
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaText}>Let's Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  headline: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subheadline: {
    fontSize: 18,
    fontWeight: '400',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  ctaButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PostDownloadScreen;
