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
      onPress={() => navigation.navigate('ChatScreen', { 
        sender_id: userData.user_id, 
        receiver_id: item.receiver_id 
      })}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>
          {item.username.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatTitle} numberOfLines={1}>
            {item.username}
          </Text>
          <Text style={styles.chatTime}>
            {new Date(item.last_message_time).toLocaleString()}
          </Text>
        </View>
        <Text style={styles.chatLastMessage} numberOfLines={2}>
          {item.last_message}
        </Text>
      </View>
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0D2C54',
    letterSpacing: 0.5,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0D2C54',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 12,
    letterSpacing: 0.3,
  },
  chatLastMessage: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
    opacity: 0.8,
    letterSpacing: 0.2,
  },
  chatTime: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 17,
    color: '#8E8E93',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
});

export default MessagesComponent;