import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

type PhoneNumber = {
  id: number;
  created_at: string;
  phone_number: string;
  user_id: string;
};

const API_BASE_URL = 'http://localhost:3000'; // Update this if your API is running on a different URL

export default function MyNumbersScreen() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPhoneNumbers();
  }, []);

  const fetchPhoneNumbers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/user-phone-numbers`);
      if (!response.ok) {
        throw new Error('Failed to fetch phone numbers');
      }
      const data = await response.json();
      setPhoneNumbers(data);
    } catch (err) {
      setError('Error fetching phone numbers. Please try again later.');
      console.error('Error fetching phone numbers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: PhoneNumber }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({
        pathname: "/conversation",
        params: { phoneNumber: item.phone_number }
      })}
    >
      <Text style={styles.numberText}>{item.phone_number}</Text>
      <Text style={styles.dateText}>{new Date(item.created_at).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Phone Numbers</Text>
      <Button title="Refresh" onPress={fetchPhoneNumbers} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : phoneNumbers.length > 0 ? (
        <FlatList
          data={phoneNumbers}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.emptyText}>You haven't purchased any numbers yet.</Text>
      )}
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
  card: {
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
    marginBottom: 8,
    color: '#000000',
  },
  dateText: {
    fontSize: 16,
    color: '#666666',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666666',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
