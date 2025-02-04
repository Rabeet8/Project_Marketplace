import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Add this import

const BottomNavigation = () => {
  const navigation = useNavigation(); // Add this hook

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => console.log('Home pressed')}
        >
          <MaterialCommunityIcons name="home-outline" size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => console.log('My Ads pressed')}
        >
          <MaterialCommunityIcons name="text-box-outline" size={24} color="#666" />
          <Text style={styles.navText}>My Ads</Text>
        </TouchableOpacity>

        <View style={styles.fabSpacer} />

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => console.log('Chat pressed')}
        >
          <View style={styles.chatIconContainer}>
            <MaterialCommunityIcons name="message-outline" size={24} color="#666" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => console.log('More pressed')}
        >
          <MaterialCommunityIcons name="dots-horizontal" size={24} color="#666" />
          <Text style={styles.navText}>More</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('Additem')} // Modified this line
        activeOpacity={0.8}
      >
        <View style={styles.fabIconContainer}>
          <MaterialCommunityIcons name="plus" size={32} color="#FFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    minWidth: 64,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
    fontWeight: '500',
  },
  fabSpacer: {
    width: 64,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0D9DA6',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  fabIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default BottomNavigation;