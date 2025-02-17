import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import logo1 from "../../../assets/images/logo1.png";
import profile from "../../../assets/images/profile.png";

import aiLogo from "../../../assets/images/ai-logo.png";
import BottomNavigator from "../../components/common/BottomNavigator";

const SingleAdDetails = () => {
  const route = useRoute();
  const { ad, aiData } = route.params;
  
  // Add debug logs to check the data
  console.log('Full ad object:', ad);
  console.log('Raw timestamp:', ad.timestamp);
  
  // Transform the images array to get just the URLs
  const carouselImages = ad.images ? ad.images.map(img => img.img_url) : [];
  
  // Add debug log to verify the transformation
  console.log('Original images:', ad.images);
  console.log('Transformed carousel images:', carouselImages);

  const [categoryName, setCategoryName] = useState("");
  const API_URL = 'https://cartkro.azurewebsites.net';

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  useEffect(() => {
    fetchCategoryName();
  }, []);

  const fetchCategoryName = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const categories = await response.json();
      const category = categories.find(([id]) => id.toString() === ad.category_id.toString());
      if (category) {
        setCategoryName(category[1]); // category[1] contains the name
      }
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const [activeTab, setActiveTab] = useState("user");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const goToNextImage = () => {
    if (currentImageIndex < carouselImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0); // Loop back to the first image
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(carouselImages.length - 1); // Loop to the last image
    }
  };

  const openImagePreview = () => {
    setIsImageModalVisible(true);
  };

  const showDescription = (description) => {
    setCurrentDescription(description);
    setModalVisible(true);
  };

  // Add debug log to check timestamp
  console.log('Ad data timestamp:', ad.timestamp);

  // Update the formatTimestamp function
  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      console.log('Timestamp is null or undefined');
      return 'Not available';
    }
    
    try {
      // If timestamp is already formatted, return as is
      if (typeof timestamp === 'string' && 
          (timestamp.includes(',') || timestamp.includes('at'))) {
        return timestamp;
      }

      // Try parsing the date
      const date = new Date(timestamp);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        // If parsing failed, return the original string
        return timestamp;
      }

      // Format the date
      return date.toLocaleDateString('en-US', {
        timeZone: 'Asia/Karachi',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) + ' ' + date.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return timestamp || 'Not available';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "user" ? styles.activeTab : null,
              ]}
              onPress={() => toggleTab("user")}
            >
              <Text style={[styles.tabText, activeTab === "user" && styles.activeTabText]}>User Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "ai" ? styles.activeTab : null,
              ]}
              onPress={() => toggleTab("ai")}
            >
              <Text style={[styles.tabText, activeTab === "ai" && styles.activeTabText]}>AI Analysis</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            {activeTab === "user" && (
              <View style={styles.detailsContainer}>
                <View style={styles.imageContainer}>
                  {carouselImages.length > 0 ? (
                    <>
                      <TouchableOpacity 
                        activeOpacity={0.9}
                        onPress={openImagePreview}
                      >
                        <Image 
                          source={{ uri: carouselImages[currentImageIndex] }} 
                          style={styles.image}
                        />
                      </TouchableOpacity>
                      
                      {carouselImages.length > 1 && (
                        <>
                          <TouchableOpacity 
                            style={[styles.carouselButton, styles.leftButton]} 
                            onPress={goToPreviousImage}
                          >
                            <Text style={styles.carouselButtonText}>‹</Text>
                          </TouchableOpacity>
                          
                          <TouchableOpacity 
                            style={[styles.carouselButton, styles.rightButton]} 
                            onPress={goToNextImage}
                          >
                            <Text style={styles.carouselButtonText}>›</Text>
                          </TouchableOpacity>
                          
                          <View style={styles.indicatorContainer}>
                            {carouselImages.map((_, index) => (
                              <View 
                                key={index} 
                                style={[
                                  styles.indicator, 
                                  index === currentImageIndex && styles.activeIndicator
                                ]} 
                              />
                            ))}
                          </View>
                        </>
                      )}
                    </>
                  ) : (
                    <View style={styles.noImageContainer}>
                      <Text style={styles.noImageText}>No images available</Text>
                    </View>
                  )}
                </View>
                <View style={styles.contentContainer}>
                  <View style={styles.userInfo}>
                    <Image source={profile} style={styles.profileImage} />
                    <View style={styles.userDetails}>
                      <Text style={styles.username}>{ad.user.f_name}</Text>
                    </View>
                    <Text style={styles.serviceBadge}>{ad.category_name}</Text>
                  </View>

                  <View style={styles.infoSection}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Location</Text>
                      <Text style={styles.detailValue}>{ad.city}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Price</Text>
                      <Text style={styles.detailValue}>Rs. {ad.price}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Model</Text>
                      <Text style={styles.detailValue}>{ad.model}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Rating</Text>
                      <Text style={styles.detailValue}>{ad.rating}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Posted On</Text>
                      <Text style={styles.detailValue}>{formatTimestamp(ad.timestamp)}</Text>
                    </View>
                  </View>

                  <View style={styles.descriptionContainer}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <TouchableOpacity onPress={() => showDescription(ad.description)}>
                      <Text 
                        numberOfLines={2} 
                        ellipsizeMode="tail"
                        style={styles.descriptionText}
                      >
                        {ad.description}
                      </Text>
                      <Text style={styles.readMore}>Read More</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            {activeTab === "ai" && (
              <View style={styles.detailsContainer}>
                <View style={styles.imageContainer}>
                  {carouselImages.length > 0 ? (
                    <>
                      <TouchableOpacity 
                        activeOpacity={0.9}
                        onPress={openImagePreview}
                      >
                        <Image 
                          source={{ uri: carouselImages[currentImageIndex] }} 
                          style={styles.image}
                        />
                      </TouchableOpacity>
                      
                      {carouselImages.length > 1 && (
                        <>
                          <TouchableOpacity 
                            style={[styles.carouselButton, styles.leftButton]} 
                            onPress={goToPreviousImage}
                          >
                            <Text style={styles.carouselButtonText}>‹</Text>
                          </TouchableOpacity>
                          
                          <TouchableOpacity 
                            style={[styles.carouselButton, styles.rightButton]} 
                            onPress={goToNextImage}
                          >
                            <Text style={styles.carouselButtonText}>›</Text>
                          </TouchableOpacity>
                          
                          <View style={styles.indicatorContainer}>
                            {carouselImages.map((_, index) => (
                              <View 
                                key={index} 
                                style={[
                                  styles.indicator, 
                                  index === currentImageIndex && styles.activeIndicator
                                ]} 
                              />
                            ))}
                          </View>
                        </>
                      )}
                    </>
                  ) : (
                    <View style={styles.noImageContainer}>
                      <Text style={styles.noImageText}>No images available</Text>
                    </View>
                  )}
                </View>
                <View style={styles.contentContainer}>
                  <View style={styles.userInfo}>
                    <Image source={aiLogo} style={styles.profileImage} />
                    <View style={styles.userDetails}>
                      <Text style={styles.username}>AI Assistant</Text>
                    </View>
                    <Text style={styles.serviceBadge}>{ad.category_name}</Text>
                  </View>

                  <View style={styles.infoSection}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Location</Text>
                      <Text style={styles.detailValue}>{ad.city}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Price</Text>
                      <Text style={styles.detailValue}>Rs. {ad.price}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Model</Text>
                      <Text style={styles.detailValue}>{ad.model}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Rating</Text>
                      <Text style={styles.detailValue}>{ad.ai_rating}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Posted On</Text>
                      <Text style={styles.detailValue}>{formatTimestamp(ad.timestamp)}</Text>
                    </View>
                  </View>

                  <View style={styles.descriptionContainer}>
                    <Text style={styles.sectionTitle}>AI Generated Description</Text>
                    <TouchableOpacity onPress={() => showDescription(ad.ai_description)}>
                      <Text 
                        numberOfLines={2} 
                        ellipsizeMode="tail"
                        style={styles.descriptionText}
                      >
                        {ad.ai_description}
                      </Text>
                      <Text style={styles.readMore}>Read More</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.callButton}>
              <Text style={styles.callButtonText}>
                {activeTab === "user" ? "Call Seller" : "Chat Now"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <ScrollView style={styles.modalScroll}>
            <Text style={styles.modalText}>{currentDescription}</Text>
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isImageModalVisible}
        onRequestClose={() => setIsImageModalVisible(false)}
      >
        <View style={styles.imageModalOverlay}>
          <TouchableOpacity
            style={styles.closeImageButton}
            onPress={() => setIsImageModalVisible(false)}
          >
            <Text style={styles.closeImageButtonText}>✕</Text>
          </TouchableOpacity>
          
          <View style={styles.imageModalContent}>
            <Image
              source={{ uri: carouselImages[currentImageIndex] }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
            
            {carouselImages.length > 1 && (
              <>
                <TouchableOpacity 
                  style={[styles.modalCarouselButton, styles.modalLeftButton]} 
                  onPress={goToPreviousImage}
                >
                  <Text style={styles.modalCarouselButtonText}>‹</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalCarouselButton, styles.modalRightButton]} 
                  onPress={goToNextImage}
                >
                  <Text style={styles.modalCarouselButtonText}>›</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <BottomNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: "#0D2C54",
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    elevation: 3,
  },
  activeTab: {
    backgroundColor: "#0D2C54",
    borderColor: "#0D2C54",
  },

  carouselButton: {
    position: 'absolute',
    top: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',  // Changed to semi-transparent white
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  leftButton: {
    left: 15,
  },
  rightButton: {
    right: 15,
  },
  carouselButtonText: {
    color: '#0D2C54',  // Changed to theme color
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 36,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  
  tabText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0D2C54",
  },
  activeTabText: {
    color: "#fff",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 10,
    elevation: 5,
  },
  imageContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 60,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 15,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0D2C54",
  },
  userDetails: {
    marginLeft: 15,
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D2C54",
    marginBottom: 4,
  },
  memberSince: {
    color: "#666",
    fontSize: 14,
  },
  serviceBadge: {
    backgroundColor: "#0D2C54",
    color: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: "600",
    elevation: 2,
  },
  descriptionContainer: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0D2C54",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0D2C54",
    marginVertical: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  callButton: {
    backgroundColor: "#0D2C54",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '50%',
    alignItems: "center",
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    // textTransform: 'uppercase',
  },
  infoSection: {
    marginVertical: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  detailLabel: {
    color: "#888",
  },
  detailValue: {
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 60, // Space for bottom navigator
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  readMore: {
    color: '#0D2C54',
    marginTop: 5,
    fontWeight: '600',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalScroll: {
    maxHeight: '90%',
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#0D2C54',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  noImageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  noImageText: {
    color: '#666',
    fontSize: 16,
  },
  activeIndicator: {
    backgroundColor: '#0D2C54',
    width: 10,
    height: 10,
  },
  imageModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '90%',
  },
  closeImageButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  closeImageButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalCarouselButton: {
    position: 'absolute',
    top: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalLeftButton: {
    left: 20,
  },
  modalRightButton: {
    right: 20,
  },
  modalCarouselButtonText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 44,
  },
});

export default SingleAdDetails;