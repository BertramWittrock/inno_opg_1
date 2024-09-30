import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for purchase history
const purchaseHistory = [
  { id: '1', number: '+1 (555) 123-4567', date: '2023-06-01', price: 10 },
  { id: '2', number: '+1 (555) 987-6543', date: '2023-05-15', price: 15 },
  { id: '3', number: '+1 (555) 246-8135', date: '2023-04-30', price: 12 },
  { id: '4', number: '+1 (555) 369-2580', date: '2023-04-22', price: 18 },
  { id: '5', number: '+1 (555) 147-2589', date: '2023-04-10', price: 20 },
];

export default function HistoryScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.numberText}>{item.number}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.priceText}>${item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Purchase History</Text>
      <FlatList
        data={purchaseHistory}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#000000',
  },
  listContent: {
    padding: 16,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000000',
  },
  dateText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});