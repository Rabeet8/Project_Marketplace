import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useFetchAds from '../../hooks/useFetchAds';

const SimpleAdCard = ({ ad, onPress }) => {
  const adImages = ad.images ? ad.images.map(img => img.img_url) : [];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          {adImages.length > 0 ? (
            <Image
              source={{ uri: adImages[0] }}
              style={styles.productImage}
            />
          ) : (
            <View style={[styles.productImage, styles.noImage]}>
              <Text>No Image</Text>
            </View>
          )}
        </View>
        
        <View style={styles.productInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>{ad.title}</Text>
            <View style={styles.serviceTag}>
              <Text style={styles.tagText}>{ad.category_name}</Text>
            </View>
          </View>
          <Text style={styles.price}>Rs. {ad.price}</Text>
          
          {/* Added location and timestamp */}
          <View style={styles.footer}>
            <Text style={styles.location}>{ad.city}</Text>
            <Text style={styles.timeAgo}>{ad.timestamp}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MainProduct = () => {
  const navigation = useNavigation();
  const { data: ads, loading, error } = useFetchAds();

  if (loading) {
    return <ActivityIndicator size="large" color="#0D2C54" style={styles.loadingIndicator} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching ads</Text>
      </View>
    );
  }

  const sortedAds = ads?.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  }) || [];

  const recentAds = sortedAds.slice(0, 10);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recent Posts</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {recentAds.map((ad) => (
          <View key={ad.ad_id || Math.random().toString()} style={styles.cardWrapper}>
            <SimpleAdCard 
              ad={ad}
              onPress={() => navigation.navigate('SingleAdDetails', { ad })}
            />
          </View>
        ))}
        {recentAds.length === 0 && (
          <Text style={styles.noAdsText}>No recent posts available</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', // Changed from '#f8f9fa' to white
  },
  scrollContainer: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  cardWrapper: {
    width: 300,
    marginHorizontal: 8,
    backgroundColor: '#fff', // Added to ensure white background
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D2C54',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noAdsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 1, // Reduced from 2 to make it less prominent
    width: 300,
    borderWidth: 1,
    borderColor: '#eee', // Added subtle border instead of shadow
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
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D2C54',
    flex: 1,
    marginRight: 8,
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
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D2C54',
  },
  noImage: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  location: {
    fontSize: 12,
    color: '#666',
  },
  timeAgo: {
    fontSize: 12,
    color: '#999',
  },
});

export default MainProduct;
