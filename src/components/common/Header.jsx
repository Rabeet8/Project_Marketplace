import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import logo from "../../../assets/images/snapTrade.png";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("User")}>
        <Ionicons name="menu" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Image
        source={logo}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity onPress={() => navigation.navigate("User")}>
        <Ionicons name="person-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#0D2C54",
    borderBottomColor: "#1a3d69",
    height: 60, // Increased from 60 to accommodate larger logo
  },
  logo: {
    width: 150,  // Increased from 100
    height: 120,  // Increased from 40
    marginHorizontal: -50, // Add negative margin to compensate for larger width
  },
});

export default Header;
