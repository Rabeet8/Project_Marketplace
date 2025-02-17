import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useFetchAds from "../../hooks/useFetchAds"; // Import the useFetchAds hook

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const ProductList = () => {
  const { data: ads, loading, error } = useFetchAds(); // Use the hook to fetch ads

  if (loading) {
    return <ActivityIndicator size="large" color="#0D2C54" style={styles.loadingIndicator} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching ads</Text>
      </View>
    );
  }

  if (!Array.isArray(ads)) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No ads available</Text>
      </View>
    );
  }

  const shuffledAds = shuffleArray(ads);
  const limitedAds = shuffledAds.slice(0, 10); // Limit to the first 10 ads

  return (
    <View>
      <Text style={styles.heading}>Recommended Ads</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {limitedAds.map((ad) => (
          <ProductCard key={ad.img_id} ad={ad} />
        ))}
      </ScrollView>
    </View>
  );
};

const ProductCard = ({ ad }) => {
  const navigation = useNavigation();

  const handleAdPress = (ad) => {
    navigation.navigate('SingleAdDetails', { ad });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleAdPress(ad)}
      >
        <Image source={{ uri: ad.images[0].img_url }} style={styles.image} resizeMode="cover" />
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D2C54',
    marginVertical: 16,
    marginHorizontal: 16,
  },
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
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default ProductList;