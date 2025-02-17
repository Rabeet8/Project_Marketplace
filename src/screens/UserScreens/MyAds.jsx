import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';

const DUMMY_ADS = [
  {
    id: 1,
    title: 'iPhone 13 Pro Max',
    description: 'Perfect condition iPhone 13 Pro Max, 256GB storage, Pacific Blue color. Comes with original box and accessories. Battery health 95%, no scratches or dents.',
    price: 'PKR 250,000',
    image: 'https://placehold.co/100x100'
  },
  {
    id: 2,
    title: 'Sony PlayStation 5',
    description: 'Brand new PS5 disc edition with extra controller. Still sealed in box. Warranty card included. Available for immediate pickup.',
    price: 'PKR 175,000',
    image: 'https://placehold.co/100x100'
  },
];

const MyAds = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Ads</Text>
      </View>
      
      {DUMMY_ADS.length > 0 ? (
        <View style={styles.adsContainer}>
          {DUMMY_ADS.map(ad => (
            <View key={ad.id} style={styles.adCard}>
              <Image
                source={{ uri: ad.image }}
                style={styles.adImage}
              />
              <View style={styles.adContent}>
                <Text style={styles.adTitle}>{ad.title}</Text>
                <Text 
                  numberOfLines={3} 
                  style={styles.adDescription}
                >
                  {ad.description}
                </Text>
                <Text style={styles.adPrice}>{ad.price}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No ads posted yet</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D2C54',
  },
  adsContainer: {
    padding: 16,
  },
  adCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  adContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D2C54',
    marginBottom: 4,
  },
  adDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  adPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E8B57',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default MyAds;
