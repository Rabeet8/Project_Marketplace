import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

// Update categories to match backend data structure
const categories = [
  { category_id: "10", type: "Laptops", icon: "laptop-outline" },
  { category_id: "11", type: "Mobiles", icon: "phone-portrait-outline" },
  { category_id: "12", type: "Headphones", icon: "headset-outline" },
  { category_id: "13", type: "Gaming", icon: "game-controller-outline" },
  { category_id: "14", type: "Tablets", icon: "tablet-landscape-outline" },
  { category_id: "15", type: "Wearables", icon: "watch-outline" },
  { category_id: "16", type: "Cameras", icon: "camera-outline" },
  { category_id: "17", type: "Smart TVs", icon: "tv-outline" },
];

const CategoryGrid = () => {
  const navigation = useNavigation();

  const handleCategoryPress = (category) => {
    navigation.navigate("AdsListings", {
      categoryId: parseInt(category.category_id),
      categoryName: category.type
    });
  };

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.category_id}
      numColumns={4}
      contentContainerStyle={styles.gridContainer}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => handleCategoryPress(item)}
        >
          <Ionicons name={item.icon} size={30} color="#0D2C54" />
          <Text style={styles.cardText}>{item.type}</Text>
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