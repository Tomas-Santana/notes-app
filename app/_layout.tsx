import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Toaster } from "sonner-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import {store} from "@/utils/atoms/store";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="system">
        <ThemeProvider value={DarkTheme}>
          <GestureHandlerRootView>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
              }}
            ></Stack>
            <Toaster
              richColors
              position="bottom-center"
              // toastOptions={{
              //   style: {
              //     backgroundColor: "#191919",
              //     borderStyle: "solid",
              //     borderWidth: 1,
              //     borderColor: "green",
              //   },
                
              //   titleStyle: {
              //     color: "green",
              //   },
              // }}
            />
          </GestureHandlerRootView>
        </ThemeProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
