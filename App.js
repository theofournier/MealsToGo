import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import * as firebase from "firebase";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infastructure/theme";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { Navigation } from "./src/infastructure/navigation";
import { FavoritesContextProvider } from "./src/services/favorites/favorites.context";
import { useState } from "react";
import { useEffect } from "react";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyBv61z3VLBtSWawflTgJo9tsiNJH3hTDiI",
  authDomain: "mealstogo-c498d.firebaseapp.com",
  projectId: "mealstogo-c498d",
  storageBucket: "mealstogo-c498d.appspot.com",
  messagingSenderId: "8666259574",
  appId: "1:8666259574:web:2a0ff3ffd3b282870d3f57",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
        <ExpoStatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
