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

  const categories = [
    { id: 'All', name: 'All' },
    { id: 1, name: 'Laptops' },
    { id: 2, name: 'Mobiles' },
    { id: 3, name: 'Gadgets' },
    { id: 6, name: 'Wearables' }
  ];

  const handleCategoryPress = (category) => {
    navigation.navigate("AdsListings", { categoryName: category.name });
  };

  return (
    <View style={styles.categoriesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
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