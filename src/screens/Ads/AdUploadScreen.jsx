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
  Modal 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { X } from 'lucide-react-native';

const API_URL = 'https://c2a8-2404-3100-1456-4f16-148-9dd9-294f-f695.ngrok-free.app/';

const CarListingComponent = () => {
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

  useEffect(() => {
    fetchBrands();
    fetchCategories();
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
      const brandNames = data.map(brand => ({
        key: brand[0],
        label: brand[1]
      }));
      setBrands(brandNames);
      setIsLoadingBrands(false);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setIsLoadingBrands(false);
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
      setIsLoadingCategories(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setIsLoadingCategories(false);
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
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
    try {
      const base64Images = await Promise.all(
        images.map(uri => convertImageToBase64(uri))
      );

      const payload = {
        title,
        description,
        category_id: category,
        brand_id: brand,
        model,
        rating: parseInt(rating),
        city,
        price: parseFloat(price),
        user_id: 1, // Replace with actual user ID
        images: base64Images.filter(img => img !== null),
      };

      console.log('Submitting payload:', payload);

      // Uncomment below to actually submit to API
      /*
      const response = await fetch(`${API_URL}/your-submit-endpoint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('Submission result:', result);
      */
    } catch (error) {
      console.error('Error submitting listing:', error);
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

  return (
    <ScrollView 
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
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
});

export default CarListingComponent;