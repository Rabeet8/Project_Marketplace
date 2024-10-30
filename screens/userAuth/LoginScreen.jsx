<<<<<<< HEAD:screens/LoginScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Logging in with:', mobile, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          {/* Uncomment and add your logo image
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          /> 
          */}
        </View>

        {/* Tabs Container */}
        <View style={styles.tabsOuterContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
              <Text style={styles.activeTabText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.tab}
              onPress={() => navigation.navigate('SignupScreen')}
            >
              <Text style={styles.inactiveTabText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* White rounded container */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in with your account</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
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
      </View>
    </SafeAreaView>
=======
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement login logic
    console.log("Logging in with:", mobile, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          <Text style={styles.tabText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in with your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        onPress={() => {
          /* Toggle password visibility */
        }}
      >
        <Text style={styles.showPassword}>Show</Text>
      </TouchableOpacity>

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
>>>>>>> f431e25b5f44e6f3b9dd53cdcd10a500569a04d2:screens/userAuth/LoginScreen.jsx
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD:screens/LoginScreen.jsx
    backgroundColor: '#0D9DA6',
  },
  topSection: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 40,
    justifyContent: 'center',
=======
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
>>>>>>> f431e25b5f44e6f3b9dd53cdcd10a500569a04d2:screens/userAuth/LoginScreen.jsx
  },
  logo: {
    width: 80,
    height: 80,
  },
  tabsOuterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabContainer: {
<<<<<<< HEAD:screens/LoginScreen.jsx
    flexDirection: 'row',
    backgroundColor: '#0D9DA6',  // Same as container background
    borderRadius: 30,
    marginHorizontal: 10,
=======
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 24,
>>>>>>> f431e25b5f44e6f3b9dd53cdcd10a500569a04d2:screens/userAuth/LoginScreen.jsx
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
<<<<<<< HEAD:screens/LoginScreen.jsx
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    margin: 4,
  },
  activeTabText: {
    color: '#0D9DA6',
    fontSize: 16,
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 24,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    paddingHorizontal: 24,
  },
  inputContainer: {
    paddingHorizontal: 24,
  },
  input: {
    height: 55,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 0,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  passwordInput: {
    marginBottom: 0,
    paddingRight: 50,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  showPasswordText: {
    color: '#0D9DA6',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#0D9DA6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFFFFF',
=======
    backgroundColor: "#00BFA6",
  },
  tabText: {
    color: "#00BFA6",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  showPassword: {
    color: "#00BFA6",
    textAlign: "right",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#00BFA6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
>>>>>>> f431e25b5f44e6f3b9dd53cdcd10a500569a04d2:screens/userAuth/LoginScreen.jsx
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerLinks: {
<<<<<<< HEAD:screens/LoginScreen.jsx
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLinkText: {
    color: '#0D9DA6',
=======
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  footerLinkText: {
    color: "#00BFA6",
>>>>>>> f431e25b5f44e6f3b9dd53cdcd10a500569a04d2:screens/userAuth/LoginScreen.jsx
    fontSize: 14,
  },
});