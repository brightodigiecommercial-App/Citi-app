import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigationStore } from '../store/navigationStore';

const GENDER_OPTIONS = [
  { id: 'man', label: 'Man', icon: '♂' },
  { id: 'woman', label: 'Woman', icon: '♀' },
  { id: 'non-binary', label: 'Non-binary', icon: '⚧' },
  { id: 'prefer-not-say', label: 'Prefer not to say', icon: '○' },
  { id: 'self-describe', label: 'Self-describe', icon: '✎' },
];

const AGE_RANGES = [
  'Under 18',
  '18-24',
  '25-29',
  '30-34',
  '35-39',
  '40-44',
  '45-49',
  '50-54',
  '55-59',
  '60-64',
  '65-69',
  '70+',
];

const RegistrationGenderAgeScreen = () => {
  const { navigateTo } = useNavigationStore();
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [customGender, setCustomGender] = useState('');

  const handleGenderSelect = (gender) => {
    if (gender.id === 'self-describe') {
      setShowGenderModal(true);
    } else {
      setSelectedGender(gender.id);
    }
  };

  const handleContinue = () => {
    if (selectedGender && selectedAge) {
      navigateTo('RegistrationPhone');
    }
  };

  const isValid = selectedGender && selectedAge;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.stepIndicator}>Step 2 of 4</Text>
          <Text style={styles.title}>About you</Text>
          <Text style={styles.subtitle}>Help us personalize your experience</Text>
        </View>

        {/* Gender Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gender</Text>
          <View style={styles.genderGrid}>
            {GENDER_OPTIONS.map((gender) => (
              <TouchableOpacity
                key={gender.id}
                style={[
                  styles.genderCard,
                  selectedGender === gender.id && styles.genderCardSelected,
                ]}
                onPress={() => handleGenderSelect(gender)}
                activeOpacity={0.8}
              >
                <Text style={styles.genderIcon}>{gender.icon}</Text>
                <Text style={[
                  styles.genderLabel,
                  selectedGender === gender.id && styles.genderLabelSelected,
                ]}>
                  {gender.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Age Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Age Group</Text>
          <View style={styles.ageGrid}>
            {AGE_RANGES.map((age) => (
              <TouchableOpacity
                key={age}
                style={[
                  styles.ageChip,
                  selectedAge === age && styles.ageChipSelected,
                ]}
                onPress={() => setSelectedAge(age)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.ageText,
                  selectedAge === age && styles.ageTextSelected,
                ]}>
                  {age}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, !isValid && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!isValid}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Gender Modal */}
      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Self-describe</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your gender identity"
              value={customGender}
              onChangeText={setCustomGender}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setSelectedGender('custom:' + customGender);
                setShowGenderModal(false);
              }}
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  genderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  genderCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  genderCardSelected: {
    borderColor: '#0066CC',
    backgroundColor: '#F0F7FF',
  },
  genderIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  genderLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
  },
  genderLabelSelected: {
    color: '#0066CC',
    fontWeight: '600',
  },
  ageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  ageChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  ageChipSelected: {
    borderColor: '#0066CC',
    backgroundColor: '#0066CC',
  },
  ageText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  ageTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#0066CC',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RegistrationGenderAgeScreen;
