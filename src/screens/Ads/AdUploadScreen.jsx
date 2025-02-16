import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Image,
  Platform,
  Modal,
  ActivityIndicator 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { X, CheckCircle2, XCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import {uploadImageAsync} from './utility.js';

const API_URL = 'https://cartkro.azurewebsites.net/';

const AdUploadScreenCOPY = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [rating, setRating] = useState(6);
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingBrands, setIsLoadingBrands] = useState(true);

  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isBrandModalVisible, setIsBrandModalVisible] = useState(false);

  const [location, setLocation] = useState({
    coords: {
      latitude: null,
      longitude: null
    }
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBrands();
    fetchCategories();
    getCurrentLocation();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${API_URL}/brands`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      
      // Check if data exists and is an array
      if (Array.isArray(data)) {
        const brandNames = data.map(brand => ({
          key: brand.brand_id.toString(),
          label: brand.brand_name
        }));
        setBrands(brandNames);
      } else {
        console.error('Invalid brands data format:', data);
        setBrands([]);
      }
      setIsLoadingBrands(false);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setBrands([]);
      setIsLoadingBrands(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      
      // Check if data exists and is an array
      if (Array.isArray(data)) {
        const categoryNames = data.map(category => ({
          key: category.category_id.toString(),
          label: category.type
        }));
        setCategories(categoryNames);
      } else {
        console.error('Invalid categories data format:', data);
        setCategories([]);
      }
      setIsLoadingCategories(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
      setIsLoadingCategories(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow location access to continue');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Unable to get your location');
    }
  };

  const takeImage = async () => {
    if (images.length >= 3) {
      alert('Maximum 3 images allowed');
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const submitListing = async () => {
    setIsLoading(true);
    try {
      // Validation
      if (!title || !description || !category || !brand || !model || !city || !price) {
        throw new Error('Please fill in all required fields');
      }
  
      // Upload images and get URLs
      const uploadedImageUrls = [];
      
      if (images.length === 0) {
        throw new Error('Please add at least one image');
      }
  
      // Upload all images to Firebase
      for (const imageUri of images) {
        try {
          const imageUrl = await uploadImageAsync(imageUri);
          uploadedImageUrls.push(imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
          throw new Error('Failed to upload images. Please try again.');
        }
      }

      const payload = {
        title,
        description,
        category_id: category,
        brand_id: brand,
        model,
        rating: parseInt(rating),
        city,
        price: parseFloat(price),
        user_id: 8, // Replace with actual user ID
        imageURLs: uploadedImageUrls, // Use the array of uploaded image URLs
        timestamp: new Date().toISOString(),
        prompt: "Analyze the condition of this product from the image and describe it without mentioning the product name. Keep it neutral, avoiding an advertisement tone. Focus on visible signs of use, functionality, and overall condition. Give a rating out of 10 based on your analysis. return response in format json with keys (rating, description).",
        longitude: location.coords.longitude?.toString() || "0",
        latitude: location.coords.latitude?.toString() || "0",
      };

      const response = await fetch(`${API_URL}/ads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), 
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create ad');
      }

      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        // Reset form fields
        setTitle('');
        setDescription('');
        setCategory('');
        setBrand('');
        setModel('');
        setRating(6);
        setCity('');
        setPrice('');
        setImages([]);
      }, 2000);

    } catch (error) {
      console.error('Error submitting listing:', error);
      setErrorMessage(error.message || 'Something went wrong');
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSelectionModal = (
    visible,
    setVisible,
    data,
    selectedValue,
    onSelect,
    title
  ) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setVisible(false)}
            >
              <X color="#0D2C54" size={24} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalList}>
            {data.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.modalItem,
                  selectedValue === item.key && styles.selectedModalItem
                ]}
                onPress={() => {
                  onSelect(item.key);
                  setVisible(false);
                }}
              >
                <Text style={[
                  styles.modalItemText,
                  selectedValue === item.key && styles.selectedModalItemText
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const handleCategorySelect = (categoryId) => {
    if (categoryId === 'All') {
      navigation.navigate('AdsListings', {
        category: 'All',
        categoryName: 'All Items'
      });
      return;
    }

    const selectedCategory = categories.find(cat => cat.key === categoryId.toString());
    console.log('Selected Category:', selectedCategory); // Debug log
    
    if (selectedCategory) {
      navigation.navigate('AdsListings', {
        category: selectedCategory.key,
        categoryName: selectedCategory.label
      });
    }
  };

  // Add this new component for success modal
  const SuccessModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showSuccessModal}
      onRequestClose={() => setShowSuccessModal(false)}
    >
      <View style={styles.successModalOverlay}>
        <View style={styles.successModalContent}>
          <View style={styles.iconContainer}>
            <CheckCircle2 color="#2E7D32" size={65} />
          </View>
          <Text style={styles.successModalTitle}>Success!</Text>
          <Text style={styles.successModalText}>Your ad has been created successfully</Text>
        </View>
      </View>
    </Modal>
  );

  // Add Loading Modal Component
  const LoadingModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isLoading}
    >
      <View style={styles.loadingModalOverlay}>
        <View style={styles.loadingModalContent}>
          <ActivityIndicator size="large" color="#0D2C54" />
          <Text style={styles.loadingModalText}>Creating your ad...</Text>
        </View>
      </View>
    </Modal>
  );

  // Add Error Modal Component
  const ErrorModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showErrorModal}
      onRequestClose={() => setShowErrorModal(false)}
    >
      <View style={styles.errorModalOverlay}>
        <View style={styles.errorModalContent}>
          <View style={styles.errorIconContainer}>
            <XCircle color="#D32F2F" size={65} />
          </View>
          <Text style={styles.errorModalTitle}>Error!</Text>
          <Text style={styles.errorModalText}>{errorMessage}</Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView 
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <SuccessModal />
      <ErrorModal />
      <LoadingModal />
      <Text style={styles.heading}>Add an item</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        placeholderTextColor="#888"
        multiline
      />

      <TouchableOpacity 
        style={styles.selectButton}
        onPress={() => setIsCategoryModalVisible(true)}
      >
        <Text style={styles.selectButtonText}>
          {category ? categories.find(c => c.key === category)?.label : 'Select Category'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.selectButton}
        onPress={() => setIsBrandModalVisible(true)}
      >
        <Text style={styles.selectButtonText}>
          {brand ? brands.find(b => b.key === brand)?.label : 'Select Brand'}
        </Text>
      </TouchableOpacity>

      {renderSelectionModal(
        isCategoryModalVisible,
        setIsCategoryModalVisible,
        categories,
        category,
        setCategory,
        'Select Category'
      )}

      {renderSelectionModal(
        isBrandModalVisible,
        setIsBrandModalVisible,
        brands,
        brand,
        setBrand,
        'Select Brand'
      )}

      <TextInput
        style={styles.input}
        value={model}
        onChangeText={setModel}
        placeholder="Write model here"
        placeholderTextColor="#888"
      />

      <View style={styles.imageUploadContainer}>
        <TouchableOpacity onPress={takeImage} style={styles.imageUploadButton}>
          <Text style={styles.imageUploadText}>
            Take Image ({images.length}/3)
          </Text>
        </TouchableOpacity>
        <View style={styles.imagePreviewContainer}>
          {images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image 
                source={{ uri }} 
                style={styles.imagePreview} 
              />
              <TouchableOpacity 
                style={styles.removeImageButton} 
                onPress={() => removeImage(index)}
              >
                <X color="white" size={16} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.label}>Rate your device:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <TouchableOpacity 
            key={num} 
            onPress={() => setRating(num)}
            style={[
              styles.ratingButton,
              rating === num && styles.selectedRatingButton
            ]}
          >
            <Text style={rating === num && styles.selectedRatingText}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter city"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />

      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={submitListing}
      >
        <Text style={styles.submitButtonText}>Submit Listing</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0D2C54',
  },
  input: {
    borderWidth: 1,
    borderColor: '#0D2C54',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: '#0D2C54',
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#0D2C54',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  selectButtonText: {
    color: '#0D2C54',
  },
  imageUploadContainer: {
    marginBottom: 16,
  },
  imageUploadButton: {
    borderWidth: 1,
    borderColor: '#0D2C54',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  imageUploadText: {
    color: '#0D2C54',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D2C54',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4, // Add some padding for better spacing
  },
  ratingButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0D2C54',
  },
  selectedRatingButton: {
    backgroundColor: '#0D2C54',
  },
  selectedRatingText: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#0D2C54',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D2C54',
  },
  closeButton: {
    padding: 4,
  },
  modalList: {
    padding: 16,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
  },
  selectedModalItem: {
    backgroundColor: '#0D2C54',
  },
  modalItemText: {
    fontSize: 16,
    color: '#0D2C54',
  },
  selectedModalItemText: {
    color: 'white',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#0D2C54',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonText: {
    color: 'white',
    fontSize: 14,
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
    maxWidth: 400,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  iconContainer: {
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
  },
  successModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center',
  },
  successModalText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingModalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
    maxWidth: 400,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    gap: 15,
  },
  loadingModalText: {
    fontSize: 16,
    color: '#0D2C54',
    marginTop: 10,
    fontWeight: '600',
  },
  errorModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorModalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
    maxWidth: 400,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  errorIconContainer: {
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
  },
  errorModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorModalText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default AdUploadScreenCOPY;