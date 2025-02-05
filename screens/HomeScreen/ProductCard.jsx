import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import adsData from "../../src/data/adsdata"; // Import ads data
import adsAIData from "../../src/data/adsAiData"; // Import AI ads data

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;

const ProductList = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {adsData.map((ad) => (
        <ProductCard key={ad.img_id} ad={ad} />
      ))}
    </ScrollView>
  );
};

const ProductCard = ({
  ad,
  isFavorite = false,
}) => {
  const navigation = useNavigation();

  const handleAdPress = (ad) => {
    const aiData = adsAIData.find(ai => ai.ad_id === ad.ad_id);
    console.log('AI Data:', aiData); // Add logging to verify the AI data
    navigation.navigate('PostDetails', { ad, aiData });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleAdPress(ad)}
      >
        <Image source={{ uri: "../../assets/images/block.jpg" }} style={styles.image} resizeMode="cover" />
        {ad.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {ad.title}
        </Text>
        <Text style={styles.price}>Rs. {ad.price.toLocaleString()}</Text>

        <View style={styles.footer}>
          <Text style={styles.location}>{ad.city}</Text>
          <Text style={styles.timeAgo}>{ad.timestamp}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "white",
    borderRadius: 8,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    height: 200, // Made taller for better visibility
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  featuredBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#7c3aed",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 36,
    height: 36,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ff4444",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    fontSize: 12,
    color: "#666",
  },
  timeAgo: {
    fontSize: 12,
    color: "#999",
  },
});

export default ProductList;
