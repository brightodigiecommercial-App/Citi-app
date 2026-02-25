import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    postcode: '',
    ageRange: '',
    gender: '',
    email: '',
    password: '',
  });

  const ageRanges = ['18-24', '25-30', '31-35', '36-40', '41-45', '46-50', '51-55', '56-60', '60+'];
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other'];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateAccount = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in email and password');
      return;
    }
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.navigate('MultifactorAuthentication', {
      phoneNumber: '1234567890',
      email: formData.email,
    });
  };

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.navigate('Home');
  };

  const renderSignUpForm = () => (
    <>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(text) => updateField('firstName', text)}
          autoCapitalize="words"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(text) => updateField('lastName', text)}
          autoCapitalize="words"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Postcode"
        value={formData.postcode}
        onChangeText={(text) => updateField('postcode', text)}
        autoCapitalize="characters"
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Age Range</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ageRanges.map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.ageButton,
                formData.ageRange === range && styles.ageButtonActive
              ]}
              onPress={() => updateField('ageRange', range)}
            >
              <Text style={[
                styles.ageButtonText,
                formData.ageRange === range && styles.ageButtonTextActive
              ]}>
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Gender</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {genderOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.genderButton,
                formData.gender === option && styles.genderButtonActive
              ]}
              onPress={() => updateField('gender', option)}
            >
              <Text style={[
                styles.genderButtonText,
                formData.gender === option && styles.genderButtonTextActive
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.logoText}>CiTiApp</Text>
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, isSignUp && styles.toggleButtonActive]}
            onPress={() => setIsSignUp(true)}
          >
            <Text style={[styles.toggleText, isSignUp && styles.toggleTextActive]}>
              Create Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, !isSignUp && styles.toggleButtonActive]}
            onPress={() => setIsSignUp(false)}
          >
            <Text style={[styles.toggleText, !isSignUp && styles.toggleTextActive]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          {isSignUp && renderSignUpForm()}

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => updateField('password', text)}
            secureTextEntry
          />

          {!isSignUp && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.termsText}>
            By tapping {isSignUp ? 'Create account' : 'Sign in'}, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>. Learn how we process your data in our{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text> and{' '}
            <Text style={styles.termsLink}>Cookies Policy</Text>.
          </Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={isSignUp ? handleCreateAccount : handleSignIn}
          >
            <Text style={styles.actionButtonText}>
              {isSignUp ? 'Create account' : 'Sign in'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text style={styles.switchButtonText}>
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    backgroundColor: '#2D2D2D',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#2563EB',
  },
  toggleText: {
    color: '#9CA3AF',
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  form: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    height: 56,
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3D3D3D',
  },
  halfInput: {
    flex: 1,
  },
  pickerContainer: {
    marginBottom: 8,
  },
  pickerLabel: {
    color: '#9CA3AF',
    marginBottom: 8,
    fontSize: 14,
  },
  ageButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#3D3D3D',
  },
  ageButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  ageButtonText: {
    color: '#9CA3AF',
    fontWeight: '500',
  },
  ageButtonTextActive: {
    color: '#FFFFFF',
  },
  genderButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#3D3D3D',
  },
  genderButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  genderButtonText: {
    color: '#9CA3AF',
    fontWeight: '500',
  },
  genderButtonTextActive: {
    color: '#FFFFFF',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#2563EB',
    fontSize: 14,
  },
  termsText: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginVertical: 16,
  },
  termsLink: {
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  actionButton: {
    backgroundColor: '#7C3AED',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  switchButton: {
    alignItems: 'center',
    marginTop: 24,
  },
  switchButtonText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});

export default LoginScreen;
