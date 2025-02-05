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
  const { ad, aiData } = route.params;

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
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "user" ? styles.activeTab : null,
          ]}
          onPress={() => toggleTab("user")}
        >
          <Text style={[styles.tabText, activeTab === "user" && styles.activeTabText]}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "ai" ? styles.activeTab : null,
          ]}
          onPress={() => toggleTab("ai")}
        >
          <Text style={[styles.tabText, activeTab === "ai" && styles.activeTabText]}>AI</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === "user" && (
          <View style={styles.detailsContainer}>
            <Image source={block} style={styles.image} />
            <View style={styles.contentContainer}>
              <View style={styles.userInfo}>
                <Image source={logo1} style={styles.profileImage} />
                <View style={styles.userDetails}>
                  <Text style={styles.username}>{ad.username}</Text>
                  <Text style={styles.memberSince}>Member since {ad.memberSince}</Text>
                </View>
                <Text style={styles.serviceBadge}>Service</Text>
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
                  <Text numberOfLines={3} style={styles.descriptionText}>
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
            <Image source={block} style={styles.image} />
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
                  <Text numberOfLines={3} style={styles.descriptionText}>
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

      {(activeTab === "user" || (activeTab === "ai" && aiData)) && (
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>
              {activeTab === "user" ? "Call Seller" : "Contact Support"}
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
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: "#0D2C54",
    borderRadius: 25,
    marginHorizontal: 8,
  },
  activeTab: {
    backgroundColor: "#0D2C54",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0D2C54",
  },
  activeTabText: {
    color: "#fff",
  },
  detailsContainer: {
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius:20,
  },
  contentContainer: {
    padding: 15,  // reduced from 20
    paddingBottom:70 // reduced from 80
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10, // reduced from 15
    backgroundColor: "#f8f8f8",
    padding: 12, // reduced from 15
    borderRadius: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userDetails: {
    marginLeft: 15,
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D2C54",
  },
  memberSince: {
    color: "#666",
    fontSize: 14,
  },
  serviceBadge: {
    backgroundColor: "#0D2C54",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D2C54",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0D2C54",
    marginVertical: 10, // reduced from 20
  },
  callButton: {
    backgroundColor: "#0D2C54",
    paddingVertical: 12, // reduced from 15
    borderRadius: 25,
    alignItems: "center",
  },
  callButtonText: {
    color: '#FFFFFF', // added white color for text
    fontSize: 16,
    fontWeight: '600',
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
  descriptionContainer: {
    marginVertical: 8, // reduced from 10
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 65,// adjusted to be closer to bottom navigator
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    paddingVertical: 8,
    zIndex: 1,
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
