import { SafeAreaView } from "@/components/utils/SafeAreaView";
import { Stack, Redirect } from "expo-router";
import { useAtomValue } from "jotai";
import { userAtom } from "@/utils/atoms/userAtom";
import AnimatedBG from "@/components/app/animatedbg";

export default function Profile() {
  const user = useAtomValue(userAtom);

  if (!user) {
    return <Redirect href="/" />;
  }
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