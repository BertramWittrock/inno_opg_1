import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
};

const dummyMessages: Message[] = [
  { id: 1, text: "Hello! How are you?", sender: 'other', timestamp: '10:00 AM' },
  { id: 2, text: "Hi there! I'm good, thanks. How about you?", sender: 'user', timestamp: '10:02 AM' },
  { id: 3, text: "I'm doing well, thanks for asking!", sender: 'other', timestamp: '10:05 AM' },
  { id: 4, text: "That's great to hear. What are your plans for today?", sender: 'user', timestamp: '10:07 AM' },
  { id: 5, text: "I'm planning to go for a walk in the park. How about you?", sender: 'other', timestamp: '10:10 AM' },
];

export default function ConversationScreen() {
  const { phoneNumber } = useLocalSearchParams();

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Conversation with {phoneNumber}</Text>
      <FlatList
        data={dummyMessages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messageList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  messageList: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});