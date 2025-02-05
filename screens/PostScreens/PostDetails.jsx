import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import block from "../../assets/images/block.jpg";
import logo1 from "../../assets/images/logo1.png";
import aiLogo from "../../assets/images/ai-logo.png";
import BottomNavigator from "../HomeScreen/BottomNavigator";
const PostDetails = () => {
  const route = useRoute();
  const { ad, aiData } = route.params;

  const [activeTab, setActiveTab] = useState("user");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "user" ? styles.activeTab : null,
          ]}
          onPress={() => toggleTab("user")}
        >
          <Text style={styles.tabText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "ai" ? styles.activeTab : null,
          ]}
          onPress={() => toggleTab("ai")}
        >
          <Text style={styles.tabText}>A222I</Text>
        </TouchableOpacity>
      </View>

      {activeTab === "user" && (
        <View style={styles.detailsContainer}>
          <Image source={block} style={styles.image} />

          <View style={styles.userInfo}>
            <Image source={logo1} style={styles.profileImage} />
            <View style={styles.userDetails}>
              <Text style={styles.username}>{ad.username}</Text>
              <Text style={styles.memberSince}>
                Member since {ad.memberSince}
              </Text>
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
            <Text style={styles.descriptionText}>{ad.description}</Text>
          </View>

          <Text style={styles.price}>Rs: {ad.price}</Text>

          <View style={styles.buttonContainer}>
            {["Chat", "Call", "SMS", "Whatsap"].map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button === "Call" ? styles.callButton : null,
                ]}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {activeTab === "ai" && aiData && (
        <View style={styles.detailsContainer}>
          <Image source={block} style={styles.image} />

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
            <Text style={styles.descriptionText}>{aiData.gen_description}</Text>
          </View>

          <Text style={styles.price}>Rs: {aiData.gen_rating}</Text>

          <View style={styles.buttonContainer}>
            {["Chat", "Call", "SMS", "Whatsap"].map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button === "Call" ? styles.callButton : null,
                ]}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {activeTab === "ai" && !aiData && (
        <View style={styles.tabContainer}>
          <Text style={styles.errorText}>
            AI data not available for this ad.
          </Text>
        </View>
      )}
      <BottomNavigator/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginHorizontal: 8,
  },
  activeTab: {
    backgroundColor: "#0D2C54",
    borderColor: "#0D2C54",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    marginTop: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userDetails: {
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  memberSince: {
    color: "#888",
  },
  serviceBadge: {
    backgroundColor: "#0D2C54",
    color: "#fff",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
  },
  infoSection: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
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
    marginVertical: 10,
  },
  descriptionText: {
    color: "#888",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0D2C54",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  callButton: {
    backgroundColor: "#0D2C54",
    borderColor: "#0D2C54",
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default PostDetails;
