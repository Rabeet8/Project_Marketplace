import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import useFetchAds from '../../hooks/useFetchAds';
import AdCard from '../../components/common/AdCard';

const AdsListings = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { categoryId = 'all', categoryName = 'All Items' } = route.params || {};
  const { data: ads, loading, error } = useFetchAds();

  const handleAdPress = (ad) => {
    navigation.navigate('SingleAdDetails', { ad });
  };

  const filteredAds = React.useMemo(() => {
    if (!ads) return [];
    if (categoryId === 'all') return ads;
    
    return ads.filter(ad => ad.category_id === categoryId);
  }, [ads, categoryId]);

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        {categoryName === 'All Items' ? 'All Items' : `${categoryName} Items`}
      </Text>

      {filteredAds.length === 0 ? (
        <View style={styles.noAdsContainer}>
          <Text style={styles.noAdsText}>No ads available</Text>
        </View>
      ) : (
        filteredAds.map((ad, index) => (
          <AdCard key={index} ad={ad} categoryName={categoryName} onPress={() => handleAdPress(ad)} />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D2C54',
    marginVertical: 16,
    marginHorizontal: 16,
    textAlign: 'center',
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
  noAdsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noAdsText: {
    fontSize: 18,
    color: '#666',
  },
});

export default AdsListings;