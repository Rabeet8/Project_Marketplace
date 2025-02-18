import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigator';
import { BASE_URL } from '@/app/environment';
import { useUser } from '../hooks/useUser';

const MessagesComponent = () => {
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const { userData } = useUser();

  useEffect(() => {
    // Fetch the list of chats from the backend
    const fetchChats = async () => {
      try {
        const response = await fetch(`${BASE_URL}/chats?sender_id=${userData.user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setChats(data.chats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    if (userData?.user_id) {
      fetchChats();
    }
  }, [userData]);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem} 
      onPress={() => navigation.navigate('ChatScreen', { sender_id: userData.user_id, receiver_id: item.receiver_id })}
    >
      <Text style={styles.chatTitle}>{item.username}</Text>
      <Text style={styles.chatLastMessage}>{item.last_message}</Text>
      <Text style={styles.chatTime}>{new Date(item.last_message_time).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.receiver_id.toString()}
        renderItem={renderChatItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No chats available</Text>}
      />
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D2C54',
  },
  chatItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 5,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chatLastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default MessagesComponent;