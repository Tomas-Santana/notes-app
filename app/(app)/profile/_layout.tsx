import { SafeAreaView } from "@/components/utils/SafeAreaView";
import { userAtom } from "@/utils/atoms/userAtom";
import { Redirect, Stack } from "expo-router";
import { useAtomValue } from "jotai";

export default function Profile() {
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