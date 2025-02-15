import * as React from "react";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import Fonts from "@/constants/Fonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import SingleAdDetails from "../src/screens/Ads/SingleAdDetails.jsx";
import HomeScreen from '../src/screens/HomeScreen'
import LoginScreen from "../src/screens/LoginScreen";
import SignupScreen from "../src/screens/SignupScreen";
import AdsListings from "../src/screens/Ads/AdsListings";
import AdUploadScreen from "../src/screens/Ads/AdUploadScreen";
import User from "../src/screens/UserScreens/User"
import ChatScreen from "../src/screens/ChatScreen.jsx"

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  // Load fonts from Fonts.ts
  const [fontsLoaded] = useFonts({
    AvenirNormal: Fonts.AvenirNormal,
    AvenirBold: Fonts.AvenirBold,
    AvenirMedium: Fonts.AvenirMedium,
  });

  // Hide splash screen after fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Keep splash screen active until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationIndependentTree>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingleAdDetails"
            component={SingleAdDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdsListings"
            component={AdsListings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdUploadScreen"
            component={AdUploadScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="User"
            component={User}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
