import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const categories = [
  { id: "1", name: "Laptops", icon: "laptop-outline" },
  { id: "2", name: "Mobiles", icon: "phone-portrait-outline" },
  { id: "3", name: "Headphones", icon: "headset-outline" },
  { id: "4", name: "Gaming", icon: "game-controller-outline" },
  { id: "5", name: "Tablets", icon: "tablet-landscape-outline" },
  { id: "6", name: "Wearables", icon: "watch-outline" },
  { id: "7", name: "Cameras", icon: "camera-outline" },
  { id: "8", name: "Smart TVs", icon: "tv-outline" },
];

const CategoryGrid = () => {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      numColumns={4}
      contentContainerStyle={styles.gridContainer}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <Ionicons name={item.icon} size={30} color="#00BFA6" />
          <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 5,
    paddingTop: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 15,
    margin: 6,
    flexBasis: "22%", 
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardText: {
    marginTop: 8,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});

export default CategoryGrid;
