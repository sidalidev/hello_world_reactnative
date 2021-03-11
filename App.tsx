import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export const CartContext = React.createContext<any>(null);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [cart, setCart] = React.useState([]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <CartContext.Provider value={[cart, setCart]}>
          <Navigation colorScheme={colorScheme} />
        </CartContext.Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
