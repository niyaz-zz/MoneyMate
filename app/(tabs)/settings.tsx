import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import { storage, AppSettings } from '../../utils/storage';
import { exportUtils } from '../../utils/export';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<AppSettings>({
    isDarkMode: false,
    currency: '₹',
    isAuthEnabled: false,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const savedSettings = await storage.getSettings();
    setSettings(savedSettings);
  }

  async function handleExport(format: 'csv' | 'pdf') {
    const transactions = await storage.getTransactions();
    
    if (format === 'csv') {
      const csv = exportUtils.generateCSV(transactions);
      await Share.share({
        message: csv,
        title: 'Financial Report.csv',
      });
    } else {
      const pdf = await exportUtils.generatePDF(transactions);
      await Share.share({
        message: pdf,
        title: 'Financial Report.pdf',
      });
    }
  }

  async function toggleSetting(key: keyof AppSettings) {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    await storage.saveSettings(newSettings);
    setSettings(newSettings);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                Switch to dark theme
              </Text>
            </View>
            <Switch
              value={settings.isDarkMode}
              onValueChange={() => toggleSetting('isDarkMode')}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Biometric Lock</Text>
              <Text style={styles.settingDescription}>
                Secure app with fingerprint/face
              </Text>
            </View>
            <Switch
              value={settings.isAuthEnabled}
              onValueChange={() => toggleSetting('isAuthEnabled')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          
          <Pressable
            style={styles.settingItem}
            onPress={() => handleExport('csv')}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Export as CSV</Text>
              <Text style={styles.settingDescription}>
                Download spreadsheet format
              </Text>
            </View>
            <ChevronRight size={20} color="#64748b" />
          </Pressable>

          <Pressable
            style={styles.settingItem}
            onPress={() => handleExport('pdf')}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Export as PDF</Text>
              <Text style={styles.settingDescription}>
                Download PDF report
              </Text>
            </View>
            <ChevronRight size={20} color="#64748b" />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingTitle}>Version</Text>
              <Text style={styles.settingDescription}>1.0.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 20,
    marginTop: 0,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingLeft: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
});