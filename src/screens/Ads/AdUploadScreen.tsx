import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Image,
  Platform 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { X } from 'lucide-react-native';

const API_URL = 'https://4cb0-2400-adc1-112-2f00-8d-2355-fd50-892b.ngrok-free.app';

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

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
          enabled={!isLoadingCategories}
        >
          <Picker.Item label="Select Category" value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat.key} label={cat.label} value={cat.key} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={brand}
          onValueChange={(itemValue) => setBrand(itemValue)}
          style={styles.picker}
          enabled={!isLoadingBrands}
        >
          <Picker.Item label="Select Brand" value="" />
          {brands.map((brandItem) => (
            <Picker.Item key={brandItem.key} label={brandItem.label} value={brandItem.key} />
          ))}
        </Picker>
      </View>

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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#0D2C54',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
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
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
});

export default CarListingComponent;