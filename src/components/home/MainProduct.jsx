import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32; 
const IMAGE_WIDTH = 100; 
const IMAGE_HEIGHT = 180; 

const MainProduct = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: "https://example.com/gaming-laptop.jpg" }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Gaming Laptops</Text>
            <Text style={styles.description}>
              Experience next-generation gaming with our premium selection of
              gaming laptops. Featuring the latest RTX graphics cards, high
              refresh rate displays, and advanced cooling technology for optimal
              performance.
            </Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => console.log("Details pressed")}
            >
              <Text style={styles.buttonText}>DETAILS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5", 
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: "row", 
    padding: 16,
    backgroundColor: "white",
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius:10,
    backgroundColor: "#f0f0f0", 
    marginRight: 16, 
  },
  textContainer: {
    flex: 1, 
  },
  title: {
    fontSize: 18, 
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 12, 
    color: "#666",
    lineHeight: 18,
    marginBottom: 16,
  },
  detailsButton: {
    backgroundColor: "#0D2C54",
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: 6,
    alignItems: "center",
    alignSelf: "flex-start", 
  },
  buttonText: {
    color: "white",
    fontSize: 12, 
    fontWeight: "600",
    letterSpacing: 1,
  },
});

export default MainProduct;
