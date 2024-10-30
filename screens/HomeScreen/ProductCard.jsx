import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75; 

const ProductList = () => {
  
  const products = [
    {
      id: 1,
      imageUrl: 'https://example.com/asus.jpg',
      title: 'Iphone 15 pro ',
      price: 200000,
      location: 'Rawalpindi',
      timeAgo: '1 day ago',
      isFeatured: true,
    },
    {
      id: 2,
      imageUrl: 'https://example.com/hairstyle.jpg',
      title: 'Macbook',
      price: 4500,
      location: 'Faisalabad',
      timeAgo: '5 hrs ago',
      isFeatured: true,
    },
    {
      id: 3,
      imageUrl: 'https://example.com/product3.jpg',
      title: 'Apple headphones',
      price: 15000,
      location: 'Lahore',
      timeAgo: '2 hrs ago',
      isFeatured: true,
    },
  ];

  return (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ScrollView>
  );
};

const ProductCard = ({ 
  imageUrl, 
  title, 
  price, 
  location, 
  timeAgo, 
  isFeatured = false,
  isFavorite = false 
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        <TouchableOpacity 
          style={styles.heartButton}
          onPress={() => {}}
        >
          <FontAwesome 
            name={isFavorite ? "heart" : "heart-o"} 
            size={24} 
            color={isFavorite ? "#ff4444" : "white"} 
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.price}>Rs. {price.toLocaleString()}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.timeAgo}>{timeAgo}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 200,  // Made taller for better visibility
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#7c3aed',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 36,
    height: 36,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ff4444',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default ProductList;