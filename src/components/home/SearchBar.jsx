import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigation.navigate('AdsListings', {
                isSearch: true,
                searchQuery: searchQuery.trim()
            });
            setSearchQuery(''); // Clear search after submitting
        }
    };

    return (
        <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#0D2C54" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="#A0A0A0"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 2,
        marginHorizontal: 20,
        marginTop: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});

export default SearchBar;
