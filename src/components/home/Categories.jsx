import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
  const navigation = useNavigation();

  // Updated categories to match backend data structure
  const categories = [
    { category_id: 'all', type: 'All Items' },
    { category_id: 10, type: 'LAPTOP' },
    { category_id: 11, type: 'MOBILE' },
    { category_id: 12, type: 'Headphones' },
    { category_id: 13, type: 'Gaming' },
    { category_id: 14, type: 'Tablets' },
    { category_id: 15, type: 'Wearables' },
    { category_id: 16, type: 'Cameras' },
    { category_id: 17, type: 'Smart TVs' },
    { category_id: 18, type: 'Gadgets' }
  ];

  const handleCategoryPress = (category) => {
    navigation.navigate("AdsListings", {
      categoryId: category.category_id,
      categoryName: category.type
    });
  };

  return (
    <View style={styles.categoriesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.category_id}
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={styles.categoryText}>{category.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  categoryButton: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0D2C54",
  },
});

export default Categories;