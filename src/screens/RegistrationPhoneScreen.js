import React, { useState } from 'react';
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

const RegistrationPhoneScreen = () => {
  const { navigateTo } = useNavigationStore();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatPhoneNumber = (text) => {
    // Simple UK phone formatting
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      setPhoneNumber(cleaned);
    }
  };

  const handleSendCode = async () => {
    if (phoneNumber.length >= 10) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigateTo('RegistrationVerifyCode', { phoneNumber });
      }, 1500);
    }
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
            <Text style={styles.title}>Phone verification</Text>
            <Text style={styles.subtitle}>
              We'll send you a verification code to confirm your number
            </Text>
          </View>

          <View style={styles.phoneContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>🇬🇧 +44</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="7123 456789"
              placeholderTextColor="#999999"
              value={phoneNumber}
              onChangeText={formatPhoneNumber}
              keyboardType="phone-pad"
              maxLength={11}
            />
          </View>

          <Text style={styles.hint}>
            Standard messaging rates may apply
          </Text>

          <TouchableOpacity
            style={[
              styles.button,
              (phoneNumber.length < 10 || isLoading) && styles.buttonDisabled,
            ]}
            onPress={handleSendCode}
            disabled={phoneNumber.length < 10 || isLoading}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </Text>
          </TouchableOpacity>
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
    lineHeight: 24,
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  countryCode: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    color: '#1A1A1A',
    backgroundColor: '#FAFAFA',
    letterSpacing: 1,
  },
  hint: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#0066CC',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RegistrationPhoneScreen;
