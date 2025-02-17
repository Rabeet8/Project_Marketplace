import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import BottomNavigation from '../../components/common/BottomNavigator';
import { useUser } from '../../hooks/useUser';

const PRIMARY_COLOR = '#0D2C54';

const UserProfile = ({ navigation }) => {
  const { userData, loading } = useUser();

  const handleLogout = () => {
    signOut(FIREBASE_AUTH)
      .then(() => {
        console.log('User logged out');
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </View>
    );
  }

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
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/images/profile.png')}
                style={styles.profileImage}
              />
            </View>
            
            <Text style={styles.userName}>
              {userData ? `${userData.f_name} ${userData.l_name}` : 'User Name'}
            </Text>
            
            <View style={styles.infoContainer}>
              <View style={styles.infoCard}>
                <View style={styles.infoItem}>
                  <Text style={styles.label}>Mobile Number</Text>
                  <Text style={styles.value}>{userData?.phone_no || 'Not set'}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Text style={styles.label}>Your Email</Text>
                  <Text style={styles.value}>{userData?.email || 'Not set'}</Text>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.label}>City</Text>
                  <Text style={styles.value}>{userData?.city || 'Not set'}</Text>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.label}>User ID</Text>
                  <Text style={styles.value}>{userData?.user_id || 'Not set'}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomNavContainer}>
        <BottomNavigation/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  mainContainer: {
    flex: 1,
    marginBottom: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
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
    marginBottom: 20,
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
    height: 60,
  },
  logoutButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default UserProfile;