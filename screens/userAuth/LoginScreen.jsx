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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  tabContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 24,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeTab: {
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
    fontSize: 16,
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  footerLinkText: {
    color: "#00BFA6",
    fontSize: 14,
  },
});
