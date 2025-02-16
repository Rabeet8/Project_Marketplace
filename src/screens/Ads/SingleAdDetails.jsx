import React, { useState, useEffect } from "react";
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
import block from "../../../assets/images/block.jpg";
import logo1 from "../../../assets/images/logo1.png";
import profile from "../../../assets/images/profile.png";

import aiLogo from "../../../assets/images/ai-logo.png";
import BottomNavigator from "../../components/common/BottomNavigator";

const SingleAdDetails = () => {
  const route = useRoute();
  const { ad, aiData } = route.params;
  const [categoryName, setCategoryName] = useState("");
  const carouselImages = [block, profile];
  const API_URL = 'https://cartkro.azurewebsites.net';

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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


  const showDescription = (description) => {
    setCurrentDescription(description);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
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
                <Image source={carouselImages[currentImageIndex]} style={styles.image} />
                
                {/* Navigation arrows for the carousel */}
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
                
                {/* Image indicators */}
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
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.userInfo}>
                  <Image source={logo1} style={styles.profileImage} />
                  <View style={styles.userDetails}>
                    <Text style={styles.username}>{ad.username}</Text>
                    <Text style={styles.memberSince}>Member since {ad.memberSince}</Text>
                  </View>
                  <Text style={styles.serviceBadge}>{categoryName || 'Item'}</Text>
                </View>

                <View style={styles.infoSection}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Location</Text>
                    <Text style={styles.detailValue}>{ad.city}</Text>
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

                <Text style={styles.price}>Rs. {ad.price}</Text>
              </View>
            </View>
          )}

          {activeTab === "ai" && aiData && (
            <View style={styles.detailsContainer}>
              <View style={styles.imageContainer}>
                <Image source={carouselImages[currentImageIndex]} style={styles.image} />
                
                {/* Navigation arrows for the carousel */}
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
                
                {/* Image indicators */}
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
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.userInfo}>
                  <Image source={aiLogo} style={styles.profileImage} />
                  <View style={styles.userDetails}>
                    <Text style={styles.username}>AI Assistant</Text>
                  </View>
                  <Text style={styles.serviceBadge}>AI</Text>
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.detailValue}>{aiData.city}</Text>
                </View>

                <View style={styles.descriptionContainer}>
                  <Text style={styles.sectionTitle}>AI Generated Description</Text>
                  <TouchableOpacity onPress={() => showDescription(aiData.gen_description)}>
                    <Text 
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.descriptionText}
                    >
                      {aiData.gen_description}
                    </Text>
                    <Text style={styles.readMore}>Read More</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.price}>Rs: {aiData.gen_rating}</Text>
              </View>
            </View>
          )}

          {activeTab === "ai" && !aiData && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                AI data not available for this ad.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {(activeTab === "user" || (activeTab === "ai" && aiData)) && (
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>
              {activeTab === "user" ? "Call Seller" : "Call Seller"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

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
    marginVertical: 10, // reduced from 15
    paddingHorizontal: 15, // reduced from 20
  },
  tabButton: {
    paddingVertical: 8, // reduced from 12
    paddingHorizontal: 25, // reduced from 35
    borderWidth: 1,
    borderColor: "#0D2C54",
    borderRadius: 20, // reduced from 30
    marginHorizontal: 8, // reduced from 10
    backgroundColor: '#fff',
    elevation: 3, // Android shadow
  },
  activeTab: {
    backgroundColor: "#0D2C54",
    borderColor: "#0D2C54",
  },

  carouselButton: {
    position: 'absolute',
    top: '40%',
    backgroundColor: '#0D2C54',  // Single solid color matching theme
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
    color: 'white',
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
    borderRadius: 15, // reduced from 20
    margin: 10, // reduced from 15
    elevation: 5, // Android shadow
  },
  imageContainer: {
    borderTopLeftRadius: 15, // reduced from 20
    borderTopRightRadius: 15, // reduced from 20
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200, // reduced from 280
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 15, // reduced from 20
    paddingBottom: 60, // reduced from 80
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10, // reduced from 15
    backgroundColor: "#f8f9fa",
    padding: 12, // reduced from 15
    borderRadius: 15,
    elevation: 2, // Android shadow
  },
  profileImage: {
    width: 50, // reduced from 60
    height: 50, // reduced from 60
    borderRadius: 25, // reduced from 30
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
    padding: 12, // reduced from 15
    borderRadius: 15,
    marginVertical: 10, // reduced from 15
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
    fontSize: 24, // reduced from 28
    fontWeight: "700", // reduced from 800
    color: "#0D2C54",
    marginVertical: 10, // reduced from 15
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  callButton: {
    backgroundColor: "#0D2C54",
    paddingVertical: 10, // reduced from 12
    paddingHorizontal: 30, // reduced from 40
    borderRadius: 25, // reduced from 30
    width: '50%', // reduced from 80%
    alignItems: "center",
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8, // reduced from 10
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 14, // reduced from 16
    fontWeight: '600', // reduced from 700
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  infoSection: {
    marginVertical: 8, // reduced from 10
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
    position: 'absolute',
    bottom: 75,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 1,
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15, // reduced from 20
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
});

export default SingleAdDetails;
