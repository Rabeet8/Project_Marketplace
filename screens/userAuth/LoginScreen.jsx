import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Logging in with:", mobile, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          {
            /* Uncomment and add your logo image */
            <Image
              source={require("../../assets/images/logo.png")}
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
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in with your account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email"
            value={mobile}
            onChangeText={setMobile}
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

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.loginButtonText}>HOME</Text>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D9DA6", // Updated to specified color
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
    width: 80,
    height: 80,
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
    color: "#0D9DA6",
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
    paddingTop: 30,
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
    color: "#0D9DA6",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#0D9DA6",
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
    color: "#0D9DA6",
    fontSize: 14,
  },
});
