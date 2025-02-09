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
  Platform,
  StatusBar,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    setError("");
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then(userCredential => {
        console.log("User logged in:", userCredential.user);
        setLoading(false);
        navigation.navigate("Home", { message: "Logged in successfully" }); // Navigate to Home with success message
      })
      .catch(error => {
        console.error("Error logging in:", error);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          setError("Invalid email or password");
        } else {
          setError("Error logging in. Please try again.");
        }
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          {
            /* Uncomment and add your logo image */
            <Image
              source={require("../../assets/images/logofinal.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          }
        </View>

        {/* Tabs Container with specified border radius */}
        <View style={styles.tabsOuterContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.activeTabText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => navigation.navigate("SignupScreen")}
            >
              <Text style={styles.inactiveTabText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* White rounded container */}
      <View style={styles.contentContainer}>
        <KeyboardAwareScrollView contentContainerStyle={{}}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in with your account</Text>

          <View style={styles.inputContainer}>
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

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>LOGIN</Text>
              )}
            </TouchableOpacity>
            <View style={styles.footerLinks}>
              <TouchableOpacity>
                <Text style={styles.footerLinkText}>Login with email</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.footerLinkText}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D2C54", // Updated to specified color
  },
  topSection: {
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 120,
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
    borderRadius: 22, // Slightly less than container for padding
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 80,
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
  loginButton: {
    backgroundColor: "#0D2C54",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});
