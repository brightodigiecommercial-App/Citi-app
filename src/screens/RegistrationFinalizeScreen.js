import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigationStore } from '../store/navigationStore';
import SuccessIcon from '../components/SuccessIcon';

const RegistrationFinalizeScreen = () => {
  const { navigateTo } = useNavigationStore();
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreateAccount = async () => {
    setIsCreating(true);
    
    // Simulate account creation
    setTimeout(() => {
      setIsCreating(false);
      setIsSuccess(true);
      
      // Send confirmation email (simulated)
      sendConfirmationEmail();
      
      // Auto-redirect after success
      setTimeout(() => {
        navigateTo('HomeScreen');
      }, 2000);
    }, 2000);
  };

  const sendConfirmationEmail = () => {
    // In real implementation, this would call your backend
    console.log('Sending confirmation email...');
    console.log('Subject: Welcome to CiTiApp');
    console.log('Email content with features list sent to user');
  };

  if (isSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContent}>
          <SuccessIcon size={120} />
          <Text style={styles.successTitle}>Account Created!</Text>
          <Text style={styles.successSubtitle}>
            Welcome to CiTiApp. Redirecting to home...
          </Text>
          <ActivityIndicator color="#0066CC" style={styles.loader} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.stepIndicator}>Step 4 of 4</Text>
          <Text style={styles.title}>Finalise Account</Text>
          <Text style={styles.subtitle}>Review and create your account</Text>
        </View>

        <View style={styles.consentContainer}>
          <Text style={styles.consentText}>
            By tapping <Text style={styles.bold}>Create Account</Text>, you agree to the CiTiApp{' '}
            <Text style={styles.link}>Terms of Service</Text>,{' '}
            <Text style={styles.link}>Privacy Policy</Text>, and{' '}
            <Text style={styles.link}>Cookie Policy</Text>.
          </Text>
        </View>

        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Your account includes:</Text>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Report issues to council in real-time</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Track progress on your dashboard</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Book paid waste collections</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Pay council tax, rent & utilities</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>View payment history & pay fines</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, isCreating && styles.buttonDisabled]}
          onPress={handleCreateAccount}
          disabled={isCreating}
          activeOpacity={0.8}
        >
          {isCreating ? (
            <View style={styles.buttonLoading}>
              <ActivityIndicator color="#FFFFFF" size="small" />
              <Text style={[styles.buttonText, styles.buttonTextLoading]}>
                Creating Account...
              </Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>
      </View>
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
    marginBottom: 32,
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
  consentContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  consentText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  },
  bold: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  link: {
    color: '#0066CC',
    fontWeight: '500',
  },
  benefitsContainer: {
    marginBottom: 32,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  benefitIcon: {
    fontSize: 16,
    color: '#00C851',
    fontWeight: 'bold',
  },
  benefitText: {
    fontSize: 15,
    color: '#444444',
  },
  button: {
    backgroundColor: '#0066CC',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    shadowColor: '#0066CC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#999999',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  buttonLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonTextLoading: {
    marginLeft: 8,
  },
  successContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 24,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  loader: {
    marginTop: 24,
  },
});

export default RegistrationFinalizeScreen;
