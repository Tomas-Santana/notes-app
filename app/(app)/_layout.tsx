import { Slot, useRouter } from "expo-router";
import { SafeAreaView } from "react-native";

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
      <Slot />
    </SafeAreaView>
    )
}