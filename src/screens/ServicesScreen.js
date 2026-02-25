import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

const ServicesScreen = () => {
  const navigation = useNavigation();

  const handleServicePress = async (service) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(service, `Navigate to ${service} payment`);
  };

  const ServiceCard = ({ icon, title, subtitle, color }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={() => handleServicePress(title)}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Services</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Council Payments</Text>
        
        <View style={styles.grid}>
          <ServiceCard 
            icon="🏠" 
            title="Pay Council Rent" 
            subtitle="Monthly & annual"
            color="#2563EB"
          />
          <ServiceCard 
            icon="💰" 
            title="Pay Council Tax" 
            subtitle="Property tax"
            color="#10B981"
          />
          <ServiceCard 
            icon="⚠️" 
            title="Pay Council Fine" 
            subtitle="Parking & violations"
            color="#EF4444"
          />
        </View>

        <Text style={styles.sectionTitle}>Utilities & Waste</Text>
        
        <View style={styles.grid}>
          <ServiceCard 
            icon="💡" 
            title="Pay Utility" 
            subtitle="Electric, gas, water"
            color="#F59E0B"
          />
          <ServiceCard 
            icon="♻️" 
            title="Book Waste Collection" 
            subtitle="Special pickup"
            color="#8B5CF6"
          />
        </View>

        <Text style={styles.sectionTitle}>Other Services</Text>
        
        <View style={styles.list}>
          <TouchableOpacity style={styles.listItem} onPress={() => handleServicePress('Report Issue')}>
            <Text style={styles.listIcon}>📝</Text>
            <View style={styles.listText}>
              <Text style={styles.listTitle}>Report Issue</Text>
              <Text style={styles.listSubtitle}>Potholes, graffiti, etc.</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => handleServicePress('View Payment History')}>
            <Text style={styles.listIcon}>📊</Text>
            <View style={styles.listText}>
              <Text style={styles.listTitle}>Payment History</Text>
              <Text style={styles.listSubtitle}>All your transactions</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 16,
    width: 50,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'flex-end',
  },
  icon: {
    fontSize: 40,
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
  list: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
  },
  listIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  listText: {
    flex: 1,
  },
  listTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 2,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default ServicesScreen;
