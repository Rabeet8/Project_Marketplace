import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../hooks/useUser';

const AdCard = ({ ad, onPress }) => {
  const navigation = useNavigation();
  const { userData } = useUser();

  const handleChatPress = () => {
    navigation.navigate('ChatScreen', {
      sender_id: userData.user_id,    // Current user's ID
      receiver_id: ad.user.user_id,   // Ad poster's ID
      adId: ad.ad_id,                 // Ad ID
      adTitle: ad.title               // Ad title
    });
  };

  // Safely get image URL from different possible data structures
  const getImageUrl = () => {
    try {
      // If imageURLs exists (from Firebase)
      if (ad.imageURLs && ad.imageURLs.length > 0) {
        return ad.imageURLs[0];
      }
      // If legacy images array exists
      if (ad.images && ad.images.length > 0 && ad.images[0].img_url) {
        return ad.images[0].img_url;
      }
      // Return default image if no valid image URL found
      
    } catch (error) {
      console.warn('Error getting image URL:', error);
 
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: getImageUrl() }}
            style={styles.productImage}
          />
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.title} numberOfLines={2}>{ad.title || 'No title'}</Text>
          <Text style={styles.price}>Rs. {ad.price?.toLocaleString() || '0'}</Text>
          
          <View style={styles.tagContainer}>
            <View style={styles.serviceTag}>
              <Text style={styles.tagText}>{ad.category_name || 'Uncategorized'}</Text>
            </View>
          </View>
          
          <Text style={styles.location}>{ad.city || 'Location not specified'}</Text>
          <Text style={styles.timeInfo}>{ad.timestamp || 'Time not specified'}</Text>
          <Text style={styles.model}>Model: {ad.model || 'Not specified'}</Text>
          <Text style={styles.rating}>Rating: {ad.rating || 'Not rated'}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.featuredButton}
              onPress={handleChatPress}
            >
              <Text style={styles.featuredButtonText}>Chat Now</Text>
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
  noImage: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdCard;