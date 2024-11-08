import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'



const ProductListing = ({ title, price, location, daysAgo, expiryDays }) => {
    return (

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
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>Rs. {price}</Text>
          
          <View style={styles.tagContainer}>
            <View style={styles.serviceTag}>
              <Text style={styles.tagText}>Service</Text>
            </View>
          </View>
          
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.timeInfo}>{daysAgo} days ago</Text>
          <Text style={styles.expiryInfo}>Expiry After: {expiryDays} days</Text>
          
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
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#0D9DA6',
      padding: 16,
      paddingTop: 40,
    },
    headerTitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    scrollView: {
      flex: 1,
    },
    offerBanner: {
      backgroundColor: '#0D9DA6',
      padding: 16,
      margin: 16,
      borderRadius: 8,
    },
    offerTitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    offerDescription: {
      color: '#fff',
      fontSize: 14,
      opacity: 0.9,
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
      color: '#0D9DA6',
      marginBottom: 8,
    },
    tagContainer: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    serviceTag: {
      backgroundColor: '#0D9DA6',
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
      backgroundColor: '#0D9DA6',
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

export default ProductListing