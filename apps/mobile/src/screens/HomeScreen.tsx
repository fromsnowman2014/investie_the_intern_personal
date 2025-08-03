import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Card } from '../components/ui/Card';
import { LineChart } from '../components/charts/LineChart';

export const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Investie Mobile</Text>
        <Text style={styles.subtitle}>Market Summary & Stock Cards</Text>
      </View>
      
      <View style={styles.content}>
        <Card>
          <Text style={styles.cardTitle}>Market Summary Card</Text>
          <Text style={styles.cardDescription}>Fear & Greed, VIX, Rates, CPI, Unemployment</Text>
          <LineChart data={[4780, 4785, 4790, 4770, 4795, 4805, 4800]} />
        </Card>
        
        <Card>
          <Text style={styles.cardTitle}>Stock Cards</Text>
          <Text style={styles.cardDescription}>AAPL, TSLA, MSFT, GOOGL, AMZN, NVDA, META, NFLX, AVGO, AMD</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
});