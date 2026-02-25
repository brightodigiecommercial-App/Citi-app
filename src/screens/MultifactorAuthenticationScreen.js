import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Animated,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const MultifactorAuthenticationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber, email } = route.params || {};
  
  const [code, setCode] = useState('');
  const [generatedCode] = useState('123456');
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(300); // 5 minutes = 300 seconds
  
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Countdown for code entry (30 seconds)
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // 5-minute timer for resend option
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Auto-validate when 6 digits entered
  useEffect(() => {
    if (code.length === 6) {
      validateCode();
    }
  }, [code]);

  const shakeError = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const validateCode = async () => {
    if (code === generatedCode) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      Alert.alert(
        'Account Activated!',
        `Welcome to CiTiApp! A confirmation email has been sent to ${email || 'your email'}.`,
        [
          {
            text: 'Continue to Home',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            },
          },
        ]
      );
    } else {
      shakeError();
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setAttempts(prev => prev + 1);
      setCode('');
      
      if (attempts >= 2) {
        Alert.alert(
          'Too Many Attempts',
          'Please request a new code.',
          [{ text: 'OK' }]
        );
      }
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;
    
    setResendTimer(300); // Reset 5-minute timer
    setCanResend(false);
    setCode('');
    setTimer(30);
    Alert.alert('Code Resent', `A new code has been sent to ${phoneNumber}`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logoText}>CiTiApp</Text>
        </View>

        <View style={styles.centerContent}>
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to{'\n'}
            <Text style={styles.phoneNumber}>{phoneNumber || 'your phone'}</Text>
          </Text>

          <Animated.View 
            style={[
              styles.inputContainer,
              { transform: [{ translateX: shakeAnimation }] }
            ]}
          >
            <TextInput
              style={styles.codeInput}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
              placeholder="------"
              placeholderTextColor="#9CA3AF"
              autoFocus
            />
          </Animated.View>

          {attempts > 0 && (
            <Text style={styles.attemptsText}>
              Invalid code. {3 - attempts} attempts remaining.
            </Text>
          )}

          {/* 5-minute resend timer */}
          <View style={styles.resendContainer}>
            {!canResend ? (
              <Text style={styles.resendTimerText}>
                Didn't receive code? Resend available in {formatTime(resendTimer)}
              </Text>
            ) : (
              <TouchableOpacity 
                style={styles.resendButton}
                onPress={handleResendCode}
              >
                <Text style={styles.resendButtonText}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.emailPreview}>
          <Text style={styles.emailLabel}>Confirmation Email Preview:</Text>
          <View style={styles.emailBox}>
            <Text style={styles.emailText}>
              Dear Esteemed User,{'\n\n'}
              Welcome to your CiTiApp account. You now have full access to the app and the following features:{'\n'}
              • Report issues to the council{'\n'}
              • Book paid collections{'\n'}
              • Pay council tax, rent, utilities, fines{'\n'}
              • View payment history{'\n'}
              • See community experiences{'\n\n'}
              Thank you for choosing CiTiApp.{'\n'}
              Sincerely, The CiTiApp Team
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 40,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563EB',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  phoneNumber: {
    color: '#2563EB',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 16,
  },
  codeInput: {
    width: 200,
    height: 60,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 8,
    color: '#1A1A1A',
    backgroundColor: '#FFFFFF',
  },
  attemptsText: {
    color: '#EF4444',
    fontSize: 14,
    marginBottom: 16,
  },
  resendContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  resendTimerText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  resendButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#2563EB',
    borderRadius: 8,
  },
  resendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emailPreview: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  emailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  emailBox: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  emailText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 18,
  },
});

export default MultifactorAuthenticationScreen;
