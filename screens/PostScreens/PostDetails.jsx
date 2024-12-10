import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import block from '../../assets/images/block.jpg';
import logo1 from '../../assets/images/logo1.png';
import aiLogo from '../../assets/images/ai-logo.png';

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState('user');

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'user' ? styles.activeTab : null,
          ]}
          onPress={() => toggleTab('user')}
        >
          <Text style={styles.tabText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'ai' ? styles.activeTab : null,
          ]}
          onPress={() => toggleTab('ai')}
        >
          <Text style={styles.tabText}>AI</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'user' && (
        <View style={styles.detailsContainer}>
          <Image source={block} style={styles.image} />

          <View style={styles.userInfo}>
            <Image source={logo1} style={styles.profileImage} />
            <View style={styles.userDetails}>
              <Text style={styles.username}>Ammar</Text>
              <Text style={styles.memberSince}>Member since Dec 2019</Text>
            </View>
            <Text style={styles.serviceBadge}>Service</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Condition</Text>
              <Text style={styles.detailValue}>Used</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>Karachi</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              Nulla eu tempor tortor. Sed iaculis sit amet purus eu pharetra.
              Maecenas eu risus sem. Fusce sollicitudin sollicitudin sapien.
            </Text>
          </View>

          <Text style={styles.price}>Rs:15,990</Text>

          <View style={styles.buttonContainer}>
            {['Chat', 'Call', 'SMS', 'Whatsap'].map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button === 'Call' ? styles.callButton : null,
                ]}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {activeTab === 'ai' && (
        <View style={styles.detailsContainer}>
          <Image source={block} style={styles.image} />

          <View style={styles.userInfo}>
            <Image source={aiLogo} style={styles.profileImage} />
            <View style={styles.userDetails}>
              <Text style={styles.username}>AI Assistant</Text>
              <Text style={styles.memberSince}>Member since Jan 2024</Text>
            </View>
            <Text style={styles.serviceBadge}>AI</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Condition</Text>
              <Text style={styles.detailValue}>New</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>Karachi</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              I am an AI assistant created by Anthropic to help analyze and provide insights about this product. I don't have a physical form, but I can offer detailed analysis, recommendations, and answer any questions you may have.
            </Text>
          </View>

          <Text style={styles.price}>16000</Text>

          <View style={styles.buttonContainer}>
            {['Chat', 'Call', 'SMS', 'Whatsap'].map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button === 'Call' ? styles.callButton : null,
                ]}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginHorizontal: 8,
  },
  activeTab: {
    backgroundColor: '#0D9DA6',
    borderColor: '#0D9DA6',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    marginTop: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userDetails: {
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberSince: {
    color: '#888',
  },
  serviceBadge: {
    backgroundColor: '#0D9DA6',
    color: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
  },
  infoSection: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    color: '#888',
  },
  detailValue: {
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  descriptionText: {
    color: '#888',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D9DA6',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  callButton: {
    backgroundColor: '#0D9DA6',
    borderColor: '#0D9DA6',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ProductDetails;