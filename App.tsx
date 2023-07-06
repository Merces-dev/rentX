import React from "react";
import Home from "./src/screens/Home";

import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/global/styles/theme";
import CarDetails from "./src/screens/CarDetails";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <CarDetails />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
