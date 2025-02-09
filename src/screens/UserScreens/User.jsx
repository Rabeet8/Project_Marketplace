import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import BottomNavigation from '../../components/common/BottomNavigator';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';

const PRIMARY_COLOR = '#0D2C54';

const UserProfile = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
      fetchUserData(currentUser.uid);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setMobileNumber(data.mobileNumber || '');
        setAddress(data.address || '');
        setCity(data.city || '');
        setUserName(data.userName || '');
        setAvatar(data.avatar || null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const pickImage = async () => {
    if (!isEditing) return;
    
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const db = getFirestore();
      const userId = FIREBASE_AUTH.currentUser.uid;
      const userData = {
        email: userEmail,
        userName,
        mobileNumber,
        address,
        city,
        avatar,
      };
      
      // First update UI state
      setIsEditing(false);
      
      // Then save to Firebase
      await setDoc(doc(db, 'users', userId), userData, { merge: true });
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to update profile');
      // Revert to editing mode if save failed
      setIsEditing(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        console.log('User logged out');
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        }); // Clear navigation stack and navigate to LoginScreen
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.headerButton, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>⎋ Logout</Text>
          </TouchableOpacity>

          {!isEditing ? (
            <TouchableOpacity 
              style={[styles.headerButton, styles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>✎ Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.headerButton, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>✓ Save</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.profileContainer}>
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
              <Image
                source={avatar ? { uri: avatar } : require('../../../assets/images/profile.png')}
                style={styles.profileImage}
              />
              {isEditing && (
                <View style={styles.editOverlay}>
                  <Text style={styles.editOverlayText}>Change</Text>
                </View>
              )}
            </TouchableOpacity>
            
            {isEditing ? (
              <TextInput
                style={styles.userNameInput}
                value={userName}
                onChangeText={setUserName}
                placeholder="Enter your name"
              />
            ) : (
              <Text style={styles.userName}>{userName || 'User Name'}</Text>
            )}

  
            
            <View style={styles.infoContainer}>
              <View style={styles.infoCard}>
                <View style={styles.infoItem}>
                  <Text style={styles.label}>Mobile Number</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={mobileNumber}
                      onChangeText={setMobileNumber}
                      placeholder="Enter mobile number"
                      keyboardType="phone-pad"
                    />
                  ) : (
                    <Text style={styles.value}>{mobileNumber || 'Not set'}</Text>
                  )}
                </View>
                
                <View style={styles.infoItem}>
                  <Text style={styles.label}>Your Email</Text>
                  <Text style={styles.value}>{userEmail}</Text>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.label}>Address</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={address}
                      onChangeText={setAddress}
                      placeholder="Enter address"
                      multiline
                    />
                  ) : (
                    <Text style={styles.value}>{address || 'Not set'}</Text>
                  )}
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.label}>City</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={city}
                      onChangeText={setCity}
                      placeholder="Enter city"
                    />
                  ) : (
                    <Text style={styles.value}>{city || 'Not set'}</Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomNavContainer}>
        <BottomNavigation/>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  mainContainer: {
    flex: 1,
    marginBottom: 60, // Height of bottom navigation
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This spreads the buttons apart
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  headerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  userNameInput: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    minWidth: 200,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
  },
  starIcon: {
    color: PRIMARY_COLOR,
    fontSize: 20,
    marginHorizontal: 2,
  },
  ratingText: {
    color: '#666',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: '600',
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 17,
    color: '#333',
    fontWeight: '500',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 60, // Fixed height
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'white',
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  logoutButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    alignItems: 'center',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  editOverlayText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default UserProfile;