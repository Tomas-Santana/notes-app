import { Slot, useRouter } from "expo-router";
import { SafeAreaView } from "@/components/utils/SafeAreaView";
import { Stack } from "expo-router";
import { View } from "react-native";
export default function Notes() {
  // const user = useAtomValue(userAtom);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, [user]);

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
