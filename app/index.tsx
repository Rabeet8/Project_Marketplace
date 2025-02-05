import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import Fonts from "@/constants/Fonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import PostDetails from "@/screens/PostScreens/PostDetails";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LoginScreen from "../screens/userAuth/LoginScreen";
import SignupScreen from "../screens/userAuth/SignupScreen";
import AdsListings from "../screens/ProductListingsScreens/AdsListings";
import Additem from "../screens/CreateAds/Additem";
import ProductListingScreen from "../screens/ProductListingsScreens/AdsListings";
import User from "../screens/UserScreens/User"


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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
          name="PostDetails"
          component={PostDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductListingScreen"
          component={AdsListings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Additem"
          component={Additem}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
