import { Slot, useRouter } from "expo-router";
import { SafeAreaView } from "@/components/utils/SafeAreaView";
import { Stack, Redirect } from "expo-router";
import { View } from "react-native";
import { userAtom } from "@/utils/atoms/userAtom";
import { useAtomValue } from "jotai";

export default function Notes() {
  const user = useAtomValue(userAtom);

  if (!user) {
    return <Redirect href="/" />;
  }

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
