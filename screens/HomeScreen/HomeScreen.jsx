import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Header from "./Header";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import CategoryGrid from "./CategoryGrid";
import ProductCard from "./ProductCard";
import MainProduct from "./MainProduct";
import BottomNavigationBar from "./BottomNavigator";

const HomeScreen = () => {
  const DATA = [
    { id: "1", component: <Header /> },
    { id: "2", component: <Categories /> },
    { id: "3", component: <SearchBar /> },
    { id: "4", component: <CategoryGrid /> },
    { id: "5", component: <ProductCard /> },
    { id: "6", component: <MainProduct /> },
    { id: "7", component: <BottomNavigationBar /> },
  ];

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.componentContainer,
        index === DATA.length - 1 && styles.noMargin,
      ]}
    >
      {item.component}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  componentContainer: {
    marginBottom: 16,
  },
  noMargin: {
    marginBottom: 0,
  },
});

export default HomeScreen;
