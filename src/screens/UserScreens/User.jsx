import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import BottomNavigation from '../../components/common/BottomNavigator';

const PRIMARY_COLOR = '#0D2C54';

const UserProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../assets/images/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>User Name</Text>
        
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Text key={index} style={styles.starIcon}>★</Text>
          ))}
          <Text style={styles.ratingText}>(4.5/5)</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <InfoItem label="Mobile Number" value="0301 9876543" />
          <InfoItem label="Your Email" value="username@usedibazar.com" />
          <InfoItem label="Whats app Number" value="0311 2345678" />
          <InfoItem label="Address" value="House number 223,street 12, Area north karachi" />
          <InfoItem label="City" value="Karachi" />
        </View>
      </View>
      
      {/* <View style={styles.bottomNav}> */}
        <BottomNavigation/>
      {/* </View> */}
    </SafeAreaView>
  );
};

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  infoItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 17,
    color: '#333',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center'
  }
});

export default UserProfile;