import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigationStore } from '../store/navigationStore';

const SignupScreen = () => {
  const { navigateTo } = useNavigationStore();

  const handleGoogleSignup = () => {
    // Implement Google OAuth
    console.log('Google signup initiated');
    navigateTo('RegistrationNameEmail');
  };

  const handleAppleSignup = () => {
    // Implement Apple OAuth
    console.log('Apple signup initiated');
    navigateTo('RegistrationNameEmail');
  };

  const handleEmailSignup = () => {
    navigateTo('RegistrationNameEmail');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>CiTi</Text>
          </View>
          <Text style={styles.appName}>CiTiApp</Text>
          <Text style={styles.tagline}>Your City, Connected</Text>
        </View>

        {/* SSO Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.googleButton]}
            onPress={handleGoogleSignup}
            activeOpacity={0.8}
          >
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>G</Text>
            </View>
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.appleButton]}
            onPress={handleAppleSignup}
            activeOpacity={0.8}
          >
            <View style={styles.iconPlaceholder}>
              <Text style={[styles.iconText, styles.appleIcon]}>🍎</Text>
            </View>
            <Text style={[styles.buttonText, styles.appleButtonText]}>
              Continue with Apple
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity 
            style={[styles.button, styles.emailButton]}
            onPress={handleEmailSignup}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, styles.emailButtonText]}>
              Continue with Registration Form
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.footerLink}>Log in</Text>
          </Text>
        </View>
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
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#0066CC',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#666666',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
  appleButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  emailButton: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  appleIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  appleButtonText: {
    color: '#FFFFFF',
  },
  emailButtonText: {
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#999999',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
  footerLink: {
    color: '#0066CC',
    fontWeight: '600',
  },
});

export default SignupScreen;
