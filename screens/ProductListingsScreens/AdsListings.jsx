import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import adsData from '../../src/data/adsdata';
import adsAIData from '../../src/data/adsAiData';

const AdsListings = () => {
  const [ads, setAds] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setAds(adsData);
  }, []);

  const handleAdPress = (ad) => {
    const aiData = adsAIData.find(ai => ai.ad_id === ad.ad_id);
    console.log('AI Data:', aiData); // Add logging to verify the AI data
    navigation.navigate('PostDetails', { ad, aiData });
  };

  return (
    <ScrollView style={styles.container}>
      {ads.map((ad, index) => (
        <TouchableOpacity key={index} onPress={() => handleAdPress(ad)}>
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/block.jpg')} // Replace with your image path
                style={styles.productImage}
              />
              <TouchableOpacity style={styles.menuButton}>
                {/* <Entypo name="dots-three-vertical" size={20} color="#666" /> */}
              </TouchableOpacity>
            </View>
            
            <View style={styles.productInfo}>
              <Text style={styles.title}>{ad.title}</Text>
              <Text style={styles.price}>Rs. {ad.price}</Text>
              
              <View style={styles.tagContainer}>
                <View style={styles.serviceTag}>
                  <Text style={styles.tagText}>Service</Text>
                </View>
              </View>
              
              <Text style={styles.location}>{ad.city}</Text>
              <Text style={styles.timeInfo}>{ad.timestamp}</Text>
              <Text style={styles.expiryInfo}>Expiry After: {ad.expiryDays} days</Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.featuredButton}>
                  <Text style={styles.featuredButtonText}>Whatsapp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.publishButton}>
                  <Text style={styles.publishButtonText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  menuButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
  },
  productInfo: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D2C54',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  serviceTag: {
    backgroundColor: '#0D2C54',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },
  location: {
    color: '#666',
    marginBottom: 4,
  },
  timeInfo: {
    color: '#666',
    fontSize: 12,
    marginBottom: 2,
  },
  expiryInfo: {
    color: '#666',
    fontSize: 12,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredButton: {
    backgroundColor: '#0D2C54',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    flex: 1,
    marginRight: 8,
  },
  publishButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    flex: 1,
    marginLeft: 8,
  },
  featuredButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  publishButtonText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default AdsListings;