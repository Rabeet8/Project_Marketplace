import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, StyleSheet, 
  ScrollView, TouchableOpacity, 
  Modal, Dimensions, Pressable,
  Image // Add this import
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker'; // Add this import

const PRIMARY_COLOR = '#0D2C54';
const { width, height } = Dimensions.get('window');

const AnimatedInput = ({ style, onFocus, onBlur, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[
      styles.inputContainer, 
      isFocused && styles.inputFocused
    ]}>
      <TextInput
        {...props}
        style={[styles.input, style]}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur && onBlur(e);
        }}
      />
    </View>
  );
};

const EnhancedModalSelector = ({ 
  data, 
  onSelect, 
  placeholder, 
  selectedValue 
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <AnimatedInput
          editable={false}
          value={selectedValue || placeholder}
          placeholder={placeholder}
        />
      </Pressable>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{placeholder}</Text>
            <ScrollView>
              {data.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  style={styles.modalItem}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const RatingSelector = ({ rating, onRatingChange }) => (
  <View style={styles.ratingContainer}>
    {[1,2,3,4,5,6,7,8,9,10].map((number) => (
      <TouchableOpacity
        key={number}
        style={[
          styles.ratingButton, 
          rating === number && styles.ratingButtonSelected
        ]}
        onPress={() => onRatingChange(number)}
      >
        <Text style={[
          styles.ratingButtonText, 
          rating === number && styles.ratingButtonTextSelected
        ]}>
          {number}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const CarSaleForm = () => {
  const [formData, setFormData] = useState({
    title: '', description: '', brand_id: null, 
    model: '', rating: null, 
    img_id: 1, city: '', category_id: null, 
    price: '', user_id: 1,
    images: [], // Change single image to array of images
  });

  const [mobileBrands, setMobileBrands] = useState([]);
  
  const [categories, setCategories] = useState([]); // Add categories state
  const [selectedBrand, setSelectedBrand] = useState(null);

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
        
        // First check the raw response
        const rawText = await response.text();
        console.log('Raw API Response:', rawText);

        // Try to parse the response
        let data;
        try {
          data = JSON.parse(rawText);
        } catch (parseError) {
          console.error('Failed to parse response:', parseError);
          console.log('Response was:', rawText);
          return;
        }

        // If parsing successful, process the data
        const brandNames = data.map(brand => ({ 
          key: brand[0], 
          label: brand[1] 
        }));
        setMobileBrands(brandNames);
        console.log('Processed brands:', brandNames);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const categoryNames = data.map(category => ({
          key: category[0],
          label: category[1]
        }));
        setCategories(categoryNames);
        console.log('Categories:', categoryNames);
        console.log('Categories Response:', response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    // console.log("hello")

    fetchBrands();
    fetchCategories();
  }, []);

  // Updated image picker function with limit of 3
  const pickImage = async () => {
    if (formData.images.length >= 3) {
      alert('Maximum 3 images allowed');
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, result.assets[0].uri]
      }));
    }
  };

  // Add function to remove image
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    const payload = { ...formData, price: Number(formData.price) };
    try {
      await fetch(`${API_URL}/brands`);
      await fetch(`${API_URL}/categories`);

      console.log('Payload', payload);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
      <Text style={styles.heading}>Add an item</Text>
        <Text style={styles.label}>Title</Text>
        <AnimatedInput
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          placeholder="Car for Sale"
        />

        <Text style={styles.label}>Description</Text>
        <AnimatedInput
          multiline
          numberOfLines={4}
          style={styles.textArea}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder="A brand new car in excellent condition."
        />

        <Text style={styles.label}>Category</Text>
        <EnhancedModalSelector
          data={categories}
          placeholder="Select Category"
          selectedValue={categories.find(c => c.key === formData.category_id)?.label}
          onSelect={(category) => 
            setFormData({ ...formData, category_id: category.key })
          }
        />

        <Text style={styles.label}>Brand</Text>
        <EnhancedModalSelector
          data={mobileBrands}
          placeholder="Select Brand"
          selectedValue={selectedBrand?.label}
          onSelect={(brand) => {
            setFormData({ ...formData, brand_id: brand.key });
            setSelectedBrand(brand);
          }}
        />

        <Text style={styles.label}>Model</Text>
        <AnimatedInput
          value={formData.model}
          onChangeText={(text) => setFormData({ ...formData, model: text })}
          placeholder="airpods pro"
        />

        {/* Updated Image Capture Section */}
        <Text style={styles.label}>Product Images (up to 3)</Text>
        {formData.images.length < 3 && (
          <TouchableOpacity 
            style={styles.imageButton} 
            onPress={pickImage}
          >
            <Text style={styles.imageButtonText}>
              Add Image ({formData.images.length}/3)
            </Text>
          </TouchableOpacity>
        )}
        
        {formData.images.length > 0 && (
          <ScrollView 
            horizontal={true} 
            style={styles.imageScrollView}
            showsHorizontalScrollIndicator={false}
          >
            {formData.images.map((uri, index) => (
              <View key={index} style={styles.imagePreviewContainer}>
                <Image 
                  source={{ uri }} 
                  style={styles.imagePreview}
                />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeImage(index)}
                >
                  <Text style={styles.removeImageText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        <Text style={styles.label}>Rating</Text>
        <RatingSelector
          rating={formData.rating}
          onRatingChange={(rating) => setFormData({ ...formData, rating })}
        />

        <Text style={styles.label}>City</Text>
        <AnimatedInput
          value={formData.city}
          onChangeText={(text) => setFormData({ ...formData, city: text })}
          placeholder="Enter city"
        />

        

        <Text style={styles.label}>Price</Text>
        <AnimatedInput
          value={formData.price.toString()}
          onChangeText={(text) => setFormData({ ...formData, price: text })}
          placeholder="Enter price"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Listing</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  formContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: '600',
    itemAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 15,
  },
  inputFocused: {
    borderColor: PRIMARY_COLOR,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    padding: 12,
    color: '#333',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  ratingButton: {
    width: '9%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  ratingButtonSelected: {
    backgroundColor: PRIMARY_COLOR,
  },
  ratingButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  ratingButtonTextSelected: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    maxHeight: height * 0.6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    textAlign: 'center',
    marginBottom: 15,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    marginTop: 15,
    backgroundColor: PRIMARY_COLOR,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageScrollView: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  imagePreviewContainer: {
    marginRight: 10,
    position: 'relative',
    marginTop: 10, // Added margin top to account for the close button overflow
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: 'red',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Increased z-index
    elevation: 3, // Added elevation for Android
    borderWidth: 2, // Added border
    borderColor: 'white', // White border for better visibility
  },
  removeImageText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 22, // Added line height for better vertical alignment
  },
  imageButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButtonText: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CarSaleForm;