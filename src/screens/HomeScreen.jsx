import React from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../components/common/Header"
import Categories from "../components/home/Categories";
import SearchBar from "../components/home/SearchBar";
import CategoryGrid from "../components/home/CategoryGrid";
import ProductCard from "../components/home/ProductCard";
import MainProduct from "../components/home/MainProduct";
import BottomNavigationBar from "../components/common/BottomNavigator";

const HomeScreen = () => {

  const DATA = [
    { id: "1", component: <Header /> },
    { id: "2", component: <Categories /> },
    { id: "3", component: <SearchBar /> },
    { id: "4", component: <CategoryGrid /> },
    { id: "5", component: <ProductCard /> },
    { id: "6", component: <MainProduct /> },
  ]; // Removed BottomNavigationBar from DATA

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.componentContainer,
        index === DATA.length - 1 && styles.lastItem, // Changed to lastItem for clarity
      ]}
    >
      {item.component}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <BottomNavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
  },
  componentContainer: {
    marginBottom: 16,
  },
  lastItem: {
    marginBottom: 80, // Add bottom margin to last item to prevent content from being hidden behind navigation
  },
  flatListContent: {
    paddingBottom: 16, // Add padding to ensure proper spacing at the bottom
  },
});

export default HomeScreen;