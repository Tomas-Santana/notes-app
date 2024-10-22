import { SafeAreaView } from "@/components/utils/SafeAreaView";
import { Stack } from "expo-router";
import AnimatedBG from "@/components/app/animatedbg";


export default function Profile() {
  return (
    <SafeAreaView className="flex-1 items-center-justify-center bg-eerie">
      <AnimatedBG />
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