import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const Categories = () => {
    const categories = ["All", "Laptops", "Mobiles", "Devices", "Gadgets", "Accessories"]; 

    return (
        <View style={styles.categoriesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.categoryButton}>
                        <Text style={styles.categoryText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    categoriesContainer: {
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    categoryButton: {
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#0D9DA6',
    },
});

export default Categories;
