import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import AuthCheck from "@/components/layout/AuthCheck";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthCheck />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
