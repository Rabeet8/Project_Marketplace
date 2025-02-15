import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const AdCard = ({ ad, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/block.jpg')} // Replace with your image path
            style={styles.productImage}
          />
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.title}>{ad.title}</Text>
          <Text style={styles.price}>Rs. {ad.price}</Text>
          
          <View style={styles.tagContainer}>
            <View style={styles.serviceTag}>
              <Text style={styles.tagText}>{ad.category_name}</Text>
            </View>
          </View>
          
          <Text style={styles.location}>{ad.city}</Text>
          <Text style={styles.timeInfo}>{ad.timestamp}</Text>
          <Text style={styles.model}>Model: {ad.model}</Text>
          <Text style={styles.rating}>Rating: {ad.rating}</Text>
          
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
  );
};

const styles = StyleSheet.create({
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
  description: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  model: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  rating: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
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

export default AdCard;