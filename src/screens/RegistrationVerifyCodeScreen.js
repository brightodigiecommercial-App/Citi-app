import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigationStore } from '../store/navigationStore';

const CODE_LENGTH = 6;

const RegistrationVerifyCodeScreen = ({ route }) => {
  const { navigateTo } = useNavigationStore();
  const { phoneNumber } = route?.params || {};
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRef = useRef(null);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleCodeChange = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, CODE_LENGTH);
    setCode(cleaned);
    
    if (cleaned.length === CODE_LENGTH) {
      verifyCode(cleaned);
    }
  };

  const verifyCode = async (verificationCode) => {
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      navigateTo('RegistrationFinalize');
    }, 1500);
  };

  const handleResend = () => {
    setResendTimer(30);
    // Resend logic here
  };

  const handleEditPhone = () => {
    navigateTo('RegistrationPhone');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.stepIndicator}>Step 3 of 4</Text>
            <Text style={styles.title}>Enter verification code</Text>
            <Text style={styles.subtitle}>
              We sent a code to{' '}
              <Text style={styles.phoneNumber}>+44 {phoneNumber}</Text>
            </Text>
          </View>

          <View style={styles.codeContainer}>
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              value={code}
              onChangeText={handleCodeChange}
              keyboardType="number-pad"
              maxLength={CODE_LENGTH}
              autoFocus
            />
            <View style={styles.codeDisplay}>
              {[...Array(CODE_LENGTH)].map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.codeDigit,
                    code.length === index && styles.codeDigitActive,
                    code.length > index && styles.codeDigitFilled,
                  ]}
                >
                  <Text style={styles.codeDigitText}>
                    {code[index] || ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {isLoading && (
            <Text style={styles.loadingText}>Verifying...</Text>
          )}

          <View style={styles.actions}>
            <TouchableOpacity 
              onPress={handleEditPhone}
              style={styles.actionButton}
            >
              <Text style={styles.actionText}>Edit phone number</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleResend}
              disabled={resendTimer > 0}
              style={styles.actionButton}
            >
              <Text style={[
                styles.actionText,
                resendTimer > 0 && styles.actionTextDisabled,
              ]}>
                Resend code{resendTimer > 0 ? ` (${resendTimer}s)` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  stepIndicator: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  phoneNumber: {
    color: '#0066CC',
    fontWeight: '600',
  },
  codeContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  codeDisplay: {
    flexDirection: 'row',
    gap: 8,
  },
  codeDigit: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  codeDigitActive: {
    borderColor: '#0066CC',
    backgroundColor: '#F0F7FF',
  },
  codeDigitFilled: {
    borderColor: '#0066CC',
    backgroundColor: '#FFFFFF',
  },
  codeDigitText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  loadingText: {
    textAlign: 'center',
    color: '#0066CC',
    fontSize: 16,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  actionButton: {
    paddingVertical: 8,
  },
  actionText: {
    color: '#0066CC',
    fontSize: 14,
    fontWeight: '600',
  },
  actionTextDisabled: {
    color: '#999999',
  },
});

export default RegistrationVerifyCodeScreen;
