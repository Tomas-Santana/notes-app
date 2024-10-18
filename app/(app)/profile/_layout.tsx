import { SafeAreaView } from "@/components/utils/SafeAreaView";
import { Stack } from "expo-router";

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 items-center-justify-center bg-eerie">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#191919" },
          
          animation: "flip",
        }}
      >
      </Stack>
    </SafeAreaView>
  );
}