import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";

const Header = () => {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("User")}>
        <Ionicons name="menu" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>SnapTrade</Text>
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
    paddingVertical: 12,
    backgroundColor: "#0D2C54",
    borderBottomColor: "#1a3d69",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});

export default Header;
