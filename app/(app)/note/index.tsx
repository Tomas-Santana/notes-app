import { View } from "react-native";
import { userAtom } from "@/utils/atoms/userAtom";
import { useAtomValue } from "jotai";
import { Navbar } from "@/components/app/navbar";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { SimpleFab } from "@/components/app/simpleFab";

export default function Notes() {
  const user = useAtomValue(userAtom);
  const router = useRouter()  
  return (
    <View className="h-screen">
      <Navbar />
      <SimpleFab href={
        {pathname: "/note/[id]", params: { id: "new" }}
      } />
    </View>
  );
}
