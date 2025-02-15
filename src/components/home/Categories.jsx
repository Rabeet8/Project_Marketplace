import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const API_URL = 'https://cartkro.azurewebsites.net';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      setCategories(data); // Store the raw API response
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryPress = (categoryId, categoryName) => {
    navigation.navigate("AdsListings", { 
      category: categoryId.toString(),
      categoryName: categoryName
    });
  };

  return (
    <View style={styles.categoriesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => handleCategoryPress('All', 'All Items')}
        >
          <Text style={styles.categoryText}>All Items</Text>
        </TouchableOpacity>

        {categories.map(([id, name], index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(id, name)}
          >
            <Text style={styles.categoryText}>{name}</Text>
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
