import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import Fonts from "@/constants/Fonts";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
// import OnBoardingScreen1 from "../screens/OnBoardingScreens/OnBoardingScreen1";
import PostDetails from "@/screens/PostScreens/PostDetails";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LoginScreen from "../screens/userAuth/LoginScreen";
import SignupScreen from "../screens/userAuth/SignupScreen";
import ProductListingScreen from "../screens/ProductListingsScreens/ProductListingScreen"

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
    // <View>
    //   <HomeScreen />
    // </View>
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
        component={ProductListingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    </NavigationContainer>

  );
}
