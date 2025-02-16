import { FIREBASE_STORAGE } from '../../../firebaseConfigCopy';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImageAsync = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      // Create unique filename
      const filename = `ad_images/${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const storageRef = ref(FIREBASE_STORAGE, filename);
      
      // Upload image
      const uploadResult = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(uploadResult.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  };