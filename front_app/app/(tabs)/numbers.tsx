import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the PhoneNumber type
type PhoneNumber = {
  id: number;
  phone_number: string;
  created_at: string;
  owned: boolean;
};

const API_BASE_URL = 'http://localhost:3000'; // Update this if your API is running on a different URL

export default function NumbersScreen() {
  const [availableNumbers, setAvailableNumbers] = useState<PhoneNumber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailableNumbers();
  }, []);

  const fetchAvailableNumbers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/available-phone-numbers`);
      if (!response.ok) {
        throw new Error('Failed to fetch available phone numbers');
      }
      const data = await response.json();
      setAvailableNumbers(data);
    } catch (err) {
      setError('Error fetching available phone numbers. Please try again later.');
      console.error('Error fetching available phone numbers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const buyPhoneNumber = async (numberId: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/purchase-phone-number/${numberId}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to purchase phone number');
      }
      const result = await response.json();
      Alert.alert('Success', 'Phone number purchased successfully!');
      // Refresh the list of available numbers
      fetchAvailableNumbers();
    } catch (err) {
      console.error('Error purchasing phone number:', err);
      Alert.alert('Error', 'Failed to purchase phone number. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: PhoneNumber }) => (
    <View style={styles.card}>
      <Text style={styles.numberText}>{item.phone_number}</Text>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => buyPhoneNumber(item.id)}
      >
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Available Phone Numbers</Text>
      {availableNumbers.length > 0 ? (
        <FlatList
          data={availableNumbers}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.emptyText}>No available phone numbers at the moment.</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
