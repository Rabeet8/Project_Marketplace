import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity
} from 'react-native';
import { useUser } from '../../hooks/useUser';
import { BASE_URL } from '@/app/environment';
import Header from '@/src/components/common/Header';
import BottomNavigation from '@/src/components/common/BottomNavigator';
import { useNavigation } from '@react-navigation/native';
import { MoreVertical, Trash2 } from 'lucide-react-native'; // Import icons

const MyAds = () => {
  const navigation = useNavigation();
  const { userData } = useUser();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchUserAds = async () => {
      try {
        const response = await fetch(`${BASE_URL}/ads/user?user_id=${userData.user_id}`);
        const data = await response.json();
        
        // Add user details to each ad
        const adsWithUserDetails = data.map(ad => ({
          ...ad,
          user: {
            user_id: userData.user_id,
            f_name: userData.f_name,
            // Add other user fields as needed
          }
        }));
        
        console.log('Ads with user details:', adsWithUserDetails); // Debug log
        setAds(adsWithUserDetails);
      } catch (error) {
        console.error('Error fetching user ads:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.user_id) {
      fetchUserAds();
    }
  }, [userData]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D2C54" />
      </View>
    );
  }

  const handleAdPress = (ad) => {
    console.log('Ad being passed to SingleAdDetails:', ad); // Debug log
    navigation.navigate('SingleAdDetails', { 
      ad: {
        ...ad,
        user: {
          user_id: userData.user_id,
          f_name: userData.f_name,
          // Add other user fields as needed
        }
      }
    });
  };

  // Add delete handler
  const handleDelete = async (adId) => {
    Alert.alert(
      "Delete Ad",
      "Are you sure you want to delete this ad?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/ads/${adId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                }
              });

              if (response.ok) {
                // Remove the ad from local state
                setAds(prevAds => prevAds.filter(ad => ad.ad_id !== adId));
                setShowOptions(false);
              } else {
                throw new Error('Failed to delete ad');
              }
            } catch (error) {
              console.error('Error deleting ad:', error);
              Alert.alert('Error', 'Failed to delete the ad');
            }
          }
        }
      ]
    );
  };

  // Options Modal Component
  const OptionsModal = () => (
    <Modal
      transparent={true}
      visible={showOptions}
      onRequestClose={() => setShowOptions(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1} 
        onPress={() => setShowOptions(false)}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.modalOption}
            onPress={() => handleDelete(selectedAd?.ad_id)}
          >
            <Trash2 color="#FF4444" size={20} />
            <Text style={styles.deleteText}>Delete Ad</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Ads</Text>
      </View>
      <ScrollView contentContainerStyle={styles.adsContainer}>
        {ads.length > 0 ? (
          ads.map(ad => (
            <View key={ad.ad_id} style={styles.adCard}>
              <TouchableOpacity 
                style={styles.adContent}
                onPress={() => handleAdPress(ad)}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: ad.images[0].img_url }}
                  style={styles.adImage}
                />
                <View style={styles.adDetails}>
                  <Text style={styles.adTitle}>{ad.title}</Text>
                  <Text numberOfLines={3} style={styles.adDescription}>
                    {ad.description}
                  </Text>
                  <Text style={styles.adPrice}>Rs. {ad.price}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.optionsButton}
                onPress={() => {
                  setSelectedAd(ad);
                  setShowOptions(true);
                }}
              >
                <MoreVertical color="#666" size={24} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No ads posted yet</Text>
          </View>
        )}
      </ScrollView>
      <OptionsModal />
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D2C54',
  },
  adsContainer: {
    padding: 16,
  },
  adCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adContent: {
    flex: 1,
    flexDirection: 'row',
  },
  adDetails: {
    flex: 1,
    marginLeft: 12,
  },
  adImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D2C54',
    marginBottom: 4,
  },
  adDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  adPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E8B57',
  },
  optionsButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '80%',
    maxWidth: 300,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  deleteText: {
    color: '#FF4444',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default MyAds;