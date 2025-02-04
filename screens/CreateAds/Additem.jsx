import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Interactive Rating Component
const RatingSelector = ({ rating, onRatingChange }) => {
  const ratingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <View style={styles.ratingContainer}>
      <View style={styles.ratingButtons}>
        {ratingNumbers.map((number) => (
          <TouchableOpacity
            key={number}
            style={[
              styles.ratingButton,
              rating === number && styles.ratingButtonSelected
            ]}
            onPress={() => onRatingChange(number)}
          >
            <Text
              style={[
                styles.ratingButtonText,
                rating === number && styles.ratingButtonTextSelected
              ]}
            >
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const CarSaleForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    brand_id: null,
    model: 'airpods pro',
    rating: null,
    img_id: 1,
    city: '',
    category_id: null,
    price: '',
    user_id: 1,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState('');
  const [mobileBrands, setMobileBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const carBrands = [
    { id: 1, name: 'Toyota' },
    { id: 2, name: 'Honda' },
    { id: 3, name: 'Ford' },
    { id: 4, name: 'BMW' },
    { id: 5, name: 'Mercedes' },
    { id: 6, name: 'Audi' },
    { id: 7, name: 'Volkswagen' },
  ];

  const categories = [
    { id: 1, name: 'Sedan' },
    { id: 2, name: 'SUV' },
    { id: 3, name: 'Hatchback' },
    { id: 4, name: 'Truck' },
    { id: 5, name: 'Sports Car' },
  ];

  const API_URL = 'https://4cb0-2400-adc1-112-2f00-8d-2355-fd50-892b.ngrok-free.app';

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${API_URL}/brands`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('API Response:', data); // Log the entire response
        const brandNames = data.map(brand => ({ id: brand[0], name: brand[1] })); // Extract brand names
        setMobileBrands(brandNames); // Set the brand names to state
        console.log('Brand Names:', brandNames); // Log brand names to console
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      const response = await fetch(`${API_URL}/brands`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('API Response:', data); // Log the entire response
      const brandNames = data.map(brand => ({ id: brand[0], name: brand[1] })); // Extract brand names
      setMobileBrands(brandNames); // Set the brand names to state
      console.log('Brand Names:', brandNames); // Log brand names to console
      console.log('Response:', response);
      console.log('Payload', payload);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const openDropdown = (type) => {
    setCurrentDropdown(type);
    setModalVisible(true);
  };

  const selectItem = (item) => {
    if (currentDropdown === 'brand') {
      setFormData({ ...formData, brand_id: item.id });
    } else if (currentDropdown === 'category') {
      setFormData({ ...formData, category_id: item.id });
    }
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          placeholder="Car for Sale"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder="A brand new car in excellent condition."
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Brand</Text>
        <Picker
          selectedValue={selectedBrand}
          onValueChange={(itemValue, itemIndex) => setSelectedBrand(itemValue)}
        >
          {mobileBrands.map((brand) => (
            <Picker.Item key={brand.id} label={brand.name} value={brand.id} />
          ))}
        </Picker>

        <Text style={styles.label}>Model</Text>
        <TextInput
          style={styles.input}
          value={formData.model}
          onChangeText={(text) => setFormData({ ...formData, model: text })}
          placeholder="airpods pro"
        />

        <Text style={styles.label}>Rating</Text>
        <RatingSelector
          rating={formData.rating}
          onRatingChange={(rating) => setFormData({ ...formData, rating })}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={formData.city}
          onChangeText={(text) => setFormData({ ...formData, city: text })}
          placeholder="Enter city"
        />

        <Text style={styles.label}>Category</Text>
        <Pressable
          style={styles.dropdownButton}
          onPress={() => openDropdown('category')}
        >
          <Text>
            {categories.find(c => c.id === formData.category_id)?.name || 'Select Category'}
          </Text>
        </Pressable>

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={formData.price.toString()}
          onChangeText={(text) => setFormData({ ...formData, price: text })}
          placeholder="Enter price"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Select {currentDropdown === 'brand' ? 'Brand' : 'Category'}
              </Text>
              <FlatList
                data={currentDropdown === 'brand' ? carBrands : categories}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.modalItem}
                    onPress={() => selectItem(item)}
                  >
                    <Text>{item.name}</Text>
                  </Pressable>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  // Rating styles
  ratingContainer: {
    marginBottom: 15,
  },
  ratingButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 8,
  },
  ratingButton: {
    width: '18%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  ratingButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  ratingButtonText: {
    fontSize: 16,
    color: '#333',
  },
  ratingButtonTextSelected: {
    color: '#fff',
  },
  ratingHelperText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default CarSaleForm;