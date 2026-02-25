import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [mode, setMode] = useState('classic'); // classic, dark, contrast
  const [activeTab, setActiveTab] = useState('home');

  const getThemeColors = () => {
    switch (mode) {
      case 'dark':
        return {
          background: '#000000',
          card: '#1A1A1A',
          text: '#FFFFFF',
          subtext: '#9CA3AF',
          accent: '#3B82F6',
          footer: '#111111',
          footerActive: '#FFFFFF',
          footerInactive: '#6B7280',
        };
      case 'contrast':
        return {
          background: '#000000',
          card: '#000000',
          text: '#FFFFFF',
          subtext: '#FFFFFF',
          accent: '#FFFF00',
          footer: '#000000',
          footerActive: '#FFFF00',
          footerInactive: '#FFFFFF',
          border: '#FFFFFF',
        };
      default: // classic
        return {
          background: '#FFFFFF',
          card: '#F3F4F6',
          text: '#1A1A1A',
          subtext: '#6B7280',
          accent: '#2563EB',
          footer: '#FFFFFF',
          footerActive: '#000000',
          footerInactive: '#9CA3AF',
        };
    }
  };

  const theme = getThemeColors();

  const handleTabPress = async (tab) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
    
    if (tab === 'services') {
      navigation.navigate('Services');
    } else if (tab === 'report') {
      Alert.alert('Report', 'Navigate to Report Issue');
    } else if (tab === 'activity') {
      Alert.alert('Activity', 'Navigate to Activity Dashboard');
    } else if (tab === 'account') {
      Alert.alert('Account', 'Navigate to Account');
    }
  };

  const ModeButton = ({ modeName, emoji }) => (
    <TouchableOpacity
      style={[
        styles.modeButton,
        mode === modeName && styles.modeButtonActive,
        { 
          backgroundColor: mode === modeName ? theme.accent : '#E5E5E5',
          borderWidth: modeName === 'contrast' && mode === 'contrast' ? 2 : 0,
          borderColor: '#FFFFFF',
        }
      ]}
      onPress={() => setMode(modeName)}
    >
      <Text style={styles.modeEmoji}>{emoji}</Text>
    </TouchableOpacity>
  );

  const ServiceCard = ({ icon, title, promo }) => (
    <TouchableOpacity
      style={[
        styles.serviceCard,
        { 
          backgroundColor: theme.card,
          borderWidth: mode === 'contrast' ? 2 : 0,
          borderColor: '#FFFFFF',
        }
      ]}
      onPress={() => Alert.alert(title, `Navigate to ${title}`)}
    >
      {promo && (
        <View style={styles.promoBadge}>
          <Text style={styles.promoText}>{promo}</Text>
        </View>
      )}
      <Text style={styles.serviceIcon}>{icon}</Text>
      <Text style={[styles.serviceTitle, { color: theme.text }]}>{title}</Text>
    </TouchableOpacity>
  );

  const AdvertCard = ({ title, subtitle, color }) => (
    <TouchableOpacity
      style={[styles.advertCard, { backgroundColor: color }]}
      onPress={() => Alert.alert('Advert', title)}
    >
      <Text style={styles.advertTitle}>{title}</Text>
      {subtitle && <Text style={styles.advertSubtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          {/* Community Access - Top Left */}
          <TouchableOpacity style={styles.communityButton}>
            <View style={styles.communityIcon}>
              <Text style={styles.communityEmoji}>👥</Text>
            </View>
            <Text style={[styles.communityText, { color: theme.text }]}>Community</Text>
          </TouchableOpacity>

          {/* Mode Toggles - Top Right */}
          <View style={styles.modesContainer}>
            <ModeButton modeName="dark" emoji="🌙" />
            <ModeButton modeName="classic" emoji="☀️" />
            <ModeButton modeName="contrast" emoji="🔲" />
          </View>
        </View>

        {/* Welcome */}
        <Text style={[styles.welcomeText, { color: theme.text }]}>
          Welcome to CiTiApp
        </Text>

        {/* Services Grid */}
        <View style={styles.servicesSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Services</Text>
          <View style={styles.servicesGrid}>
            <ServiceCard icon="🏠" title="Pay Council Rent" promo="NEW" />
            <ServiceCard icon="💰" title="Pay Council Tax" />
            <ServiceCard icon="💡" title="Pay Utility" promo="POPULAR" />
            <ServiceCard icon="⚠️" title="Pay Council Fine" />
            <ServiceCard icon="♻️" title="Book Waste Collection" />
          </View>
        </View>

        {/* Advert Cards */}
        <View style={styles.advertsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Updates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <AdvertCard 
              title="New: Report Issues Directly" 
              subtitle="Track progress in real-time"
              color="#2563EB"
            />
            <AdvertCard 
              title="Community Survey 2025" 
              subtitle="Share your feedback"
              color="#10B981"
            />
            <AdvertCard 
              title="Waste Collection Discount" 
              subtitle="20% off this month"
              color="#F59E0B"
            />
          </ScrollView>
        </View>
      </ScrollView>

      {/* Uber-Style Footer */}
      <View style={[styles.footer, { backgroundColor: theme.footer, borderTopColor: mode === 'contrast' ? '#FFFFFF' : '#E5E5E5', borderTopWidth: mode === 'contrast' ? 2 : 1 }]}>
        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={() => handleTabPress('home')}
        >
          <Text style={[styles.footerIcon, { color: activeTab === 'home' ? theme.footerActive : theme.footerInactive }]}>🏠</Text>
          <Text style={[styles.footerLabel, { color: activeTab === 'home' ? theme.footerActive : theme.footerInactive }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={() => handleTabPress('services')}
        >
          <Text style={[styles.footerIcon, { color: activeTab === 'services' ? theme.footerActive : theme.footerInactive }]}>⚡</Text>
          <Text style={[styles.footerLabel, { color: activeTab === 'services' ? theme.footerActive : theme.footerInactive }]}>Services</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={() => handleTabPress('report')}
        >
          <Text style={[styles.footerIcon, { color: activeTab === 'report' ? theme.footerActive : theme.footerInactive }]}>🎙️</Text>
          <Text style={[styles.footerLabel, { color: activeTab === 'report' ? theme.footerActive : theme.footerInactive }]}>Report</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={() => handleTabPress('activity')}
        >
          <Text style={[styles.footerIcon, { color: activeTab === 'activity' ? theme.footerActive : theme.footerInactive }]}>📊</Text>
          <Text style={[styles.footerLabel, { color: activeTab === 'activity' ? theme.footerActive : theme.footerInactive }]}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.footerItem} 
          onPress={() => handleTabPress('account')}
        >
          <Text style={[styles.footerIcon, { color: activeTab === 'account' ? theme.footerActive : theme.footerInactive }]}>👤</Text>
          <Text style={[styles.footerLabel, { color: activeTab === 'account' ? theme.footerActive : theme.footerInactive }]}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100, // Space for footer
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  communityButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  communityEmoji: {
    fontSize: 20,
  },
  communityText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  modeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeButtonActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modeEmoji: {
    fontSize: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  servicesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    position: 'relative',
  },
  promoBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  promoText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  advertsSection: {
    marginBottom: 24,
  },
  advertCard: {
    width: 200,
    height: 120,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    justifyContent: 'flex-end',
  },
  advertTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  advertSubtitle: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
  },
  footerItem: {
    alignItems: 'center',
    flex: 1,
  },
  footerIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  footerLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default HomeScreen;
