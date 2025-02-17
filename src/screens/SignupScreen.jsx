import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { X } from 'lucide-react-native';
import { BASE_URL } from "@/app/environment";
import logo from "../../assets/images/snapTrade.png";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

  const genderOptions = [
    { key: 'male', label: 'Male' },
    { key: 'female', label: 'Female' },
    
  ];

  const GenderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isGenderModalVisible}
      onRequestClose={() => setIsGenderModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setIsGenderModalVisible(false)}
            >
              <X color="#0D2C54" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalList}>
            {genderOptions.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.modalItem,
                  gender === item.key && styles.selectedModalItem
                ]}
                onPress={() => {
                  setGender(item.key);
                  setIsGenderModalVisible(false);
                }}
              >
                <Text style={[
                  styles.modalItemText,
                  gender === item.key && styles.selectedModalItemText
                ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword || !f_name || !l_name || !phone_no || !gender || !city || !date_of_birth) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then(userCredential => {
        console.log("User signed up:", userCredential.user);
        console.log("User email:", userCredential.user.email); // Add this line
        sendEmailVerification(userCredential.user)
          .then(() => {
            console.log("Email verification sent");
            const userData = {
              f_name,
              l_name,
              email,
              phone_no,
              gender,
              city,
              date_of_birth,
              FUID: userCredential.user.uid,
            };
            fetch(`${BASE_URL}/users`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            })
              .then(response => response.json())
              .then(data => {
                console.log("User data posted:", data);
                setLoading(false);
                navigation.navigate("Home", { message: "Signed up successfully. Please verify your email." });
              })
              .catch(error => {
                console.error("Error posting user data:", error);
                setError("Error signing up. Please try again.");
                setLoading(false);
              });
          });
      })
      .catch(error => {
        console.error("Error signing up:", error);
        if (error.code === 'auth/email-already-in-use') {
          setError("Email is already in use");
        } else if (error.code === 'auth/weak-password') {
          setError("Password should be at least 6 characters");
        } else if (error.code === 'auth/missing-password') {
          setError("Password is required");
        } else {
          setError("Error signing up. Please try again.");
        }
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Tabs Container */}
        <View style={styles.tabsOuterContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.inactiveTabText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.activeTabText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* White rounded container */}
      <View style={styles.contentContainer}>
        <KeyboardAwareScrollView contentContainerStyle={{ autoscroll: true }}>
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={f_name}
              onChangeText={setF_name}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={l_name}
              onChangeText={setL_name}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone_no}
              onChangeText={setPhone_no}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => setIsGenderModalVisible(true)}
            >
              <Text style={[
                styles.selectButtonText,
                !gender && styles.placeholderText
              ]}>
                {gender ? genderOptions.find(g => g.key === gender)?.label : 'Select Gender'}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={date_of_birth}
              onChangeText={setDate_of_birth}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#999"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Password"
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.showPasswordText}>Show</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Confirm Password"
                value={confirmPassword}
                secureTextEntry={!showConfirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Text style={styles.showPasswordText}>Show</Text>
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.signUpButtonText}>SIGN UP</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footerLinks}>
              <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                <Text style={styles.footerLinkText}>
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <GenderModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D2C54",
  },
  topSection: {
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
    height: 160, // Added fixed height to contain the logo
    overflow: 'hidden', // Prevent logo from overflowing
  },
  logo: {
    width: 300,  // Increased width
    height: 240, // Increased height
    marginTop: -40, // Negative margin to adjust vertical position
    marginBottom: -40, // Negative margin to adjust vertical position
  },
  tabsOuterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 22,
  },
  activeTabText: {
    color: "#0D2C54",
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  inactiveTabText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    paddingHorizontal: 24,
  },
  inputContainer: {
    paddingHorizontal: 24,
  },
  input: {
    height: 48,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  pickerContainer: {
    height: 48,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  picker: {
    height: 48,
    width: '100%',
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 24,
  },
  passwordInput: {
    marginBottom: 0,
    paddingRight: 50,
  },
  showPasswordButton: {
    position: "absolute",
    right: 16,
    top: 12,
  },
  showPasswordText: {
    color: "#0D2C54",
    fontSize: 14,
    fontWeight: "500",
  },
  signUpButton: {
    backgroundColor: "#0D2C54",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerLinkText: {
    color: "#0D2C54",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
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
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D2C54',
  },
  closeButton: {
    padding: 4,
  },
  modalList: {
    padding: 20,
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
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
  selectButton: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'center',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#000',
  },
  placeholderText: {
    color: '#999',
  },
});