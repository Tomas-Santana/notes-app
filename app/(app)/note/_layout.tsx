import { Slot, useRouter } from "expo-router";
import { SafeAreaView } from "@/components/utils/SafeAreaView";
import { Stack, Redirect } from "expo-router";
import { View } from "react-native";
import { userAtom } from "@/utils/atoms/userAtom";
import { useAtomValue } from "jotai";
import { Bg } from "@/components/new/Bg";

export default function Notes() {
  const user = useAtomValue(userAtom);

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView className="flex-1 items-center-justify-center">
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          
          animation: "flip",
        }}
      >

        

      </Stack>
      <Bg />
    </SafeAreaView>
  );
}
