import React, { useState } from "react";
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
import aiLogo from "../../../assets/images/ai-logo.png";
import BottomNavigator from "../../components/common/BottomNavigator";

const SingleAdDetails = () => {
  const route = useRoute();
  const { ad } = route.params;

  const [activeTab, setActiveTab] = useState("user");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");

  const toggleTab = (tab) => {
    setActiveTab(tab);
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
                <Image source={block} style={styles.image} />
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.userInfo}>
                  <Image source={logo1} style={styles.profileImage} />
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
                    <Text style={styles.detailValue}>{ad.timestamp}</Text>
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
                <Image source={block} style={styles.image} />
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
                    <Text style={styles.detailValue}>{ad.timestamp}</Text>
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
      </View>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>
            {activeTab === "user" ? "Call Seller" : "Get Help"}
          </Text>
        </TouchableOpacity>
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
    letterSpacing: 0.5,
    textTransform: 'uppercase',
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
});

export default SingleAdDetails;