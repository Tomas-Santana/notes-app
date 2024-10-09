import { Text, View } from "react-native";
import { userAtom } from "@/utils/atoms/userAtom";
import { useAtomValue } from "jotai";
import { Navbar } from "@/components/app/navbar";
import { Plus } from "lucide-react-native";
import { Fab, FabIcon } from "@/components/ui/fab";
import { useRouter } from "expo-router";

export default function Notes() {
  const user = useAtomValue(userAtom);
  const router = useRouter()  
  return (
    <View className="h-full">
      <Navbar />
      {/* <Navbar />
      <Text className="text-white">
        {user ? `Welcome, ${user.firstName}` : "Notes Page"}
      </Text>
       */}
      <Fab size="lg"
        
      >
        <FabIcon as={Plus} className="text-white h-6 w-6" />
      </Fab>
    </View>
  );
}
