import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import Header from '../components/common/Header'; // Adjust the import path as needed
import { BASE_URL } from '@/app/environment';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();
  const { sender_id, receiver_id } = route.params;

  useEffect(() => {
    console.log('sender_id:', sender_id);
    console.log('receiver_id:', receiver_id);
  }, [sender_id, receiver_id]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${BASE_URL}/get_messages?sender_id=${sender_id}&receiver_id=${receiver_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const formattedMessages = data.messages.map(msg => ({
        _id: msg.id,
        text: msg.message,
        createdAt: new Date(msg.timestamp),
        user: {
          _id: msg.sender_id,
          name: `${msg.sender[1]} ${msg.sender[2]}`,
          avatar: 'https://placeimg.com/140/140/any', // Placeholder avatar
        },
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [sender_id, receiver_id]);

  const onSend = useCallback(async (messages = []) => {
    const message = messages[0];
    const payload = {
      sender_id: sender_id,
      receiver_id: receiver_id,
      message: message.text,
    };

    console.log('Sending message with payload:', payload);

    try {
      const response = await fetch(`${BASE_URL}/send_message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('Response from server:', data);
      if (data.message === "Message sent successfully") {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
      } else {
        console.error('Error sending message:', data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [sender_id, receiver_id]);

  const renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </View>
    </Send>
  );

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      primaryStyle={{ alignItems: 'center' }}
    />
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchMessages();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0D2C54" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Chat" />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: sender_id,
        }}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    marginBottom: 5,
    marginRight: 10,
    backgroundColor: '#0D2C54',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    padding: 5,
  },
});

export default ChatScreen;