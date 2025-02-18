import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import useFetchAds from '../../hooks/useFetchAds';
import AdCard from '../../components/common/AdCard';
import Header from '@/src/components/common/Header';
import BottomNavigation from '@/src/components/common/BottomNavigator';

const AdsListings = () => {
    const navigation = useNavigation();
    const route = useRoute();
    
    const { 
        categoryId = 'all', 
        categoryName = 'All Items',
        isSearch = false,
        searchQuery = '' 
    } = route.params || {};

    const { data: ads, loading, error } = useFetchAds();
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (isSearch && searchQuery) {
                setIsSearching(true);
                try {
                    const response = await fetch(
                        `https://cartkro.azurewebsites.net/ads/search?query=${encodeURIComponent(searchQuery)}`
                    );
                    if (!response.ok) {
                        throw new Error('Search failed');
                    }
                    const data = await response.json();
                    setSearchResults(data);
                } catch (error) {
                    console.error('Search error:', error);
                    setSearchResults([]);
                } finally {
                    setIsSearching(false);
                }
            }
        };

        fetchSearchResults();
    }, [isSearch, searchQuery]);

    const filteredAds = React.useMemo(() => {
        if (isSearch) return searchResults;
        if (!ads) return [];
        if (categoryId === 'all') return ads;
        return ads.filter(ad => ad.category_id === categoryId);
    }, [ads, categoryId, isSearch, searchResults]);

    const renderAdCard = (ad, index) => {
        if (!ad || typeof ad !== 'object') {
            console.warn(`Invalid ad data at index ${index}:`, ad);
            return null;
        }

        return (
            <AdCard 
                key={`${ad.id || index}`} 
                ad={ad} 
                categoryName={categoryName} 
                onPress={() => navigation.navigate('SingleAdDetails', { ad })} 
            />
        );
    };

    if (loading || isSearching) {
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
        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.heading}>
                    {isSearch 
                        ? `Search Results: ${searchQuery}`
                        : categoryName === 'All Items' 
                            ? 'All Items' 
                            : `${categoryName} Items`
                    }
                </Text>

                {filteredAds.length === 0 ? (
                    <View style={styles.noAdsContainer}>
                        <Text style={styles.noAdsText}>
                            {isSearch ? 'No results found' : 'No ads available'}
                        </Text>
                    </View>
                ) : (
                    <View style={styles.adsContainer}>
                        {filteredAds
                            .filter(ad => ad !== undefined && ad !== null)
                            .map((ad, index) => renderAdCard(ad, index))}
                    </View>
                )}
            </ScrollView>
            <BottomNavigation />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 60, // Ensure content does not overlap with BottomNavigation
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
    adsContainer: {
        padding: 8,
    },
});

export default AdsListings;