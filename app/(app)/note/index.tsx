import { Text, View } from "react-native";
import { userAtom } from "@/utils/atoms/userAtom";
import { useAtomValue } from "jotai";
import { Navbar } from "@/components/app/navbar";
import { Plus } from "lucide-react-native";
import { Fab, FabIcon } from "@/components/ui/fab";
import { useRouter } from "expo-router";
import { SafeAreaView } from "@/components/utils/SafeAreaView";
import { Icon } from "@/components/ui/icon";
import { Link } from "expo-router";

export default function Notes() {
  const user = useAtomValue(userAtom);
  const router = useRouter()  
  return (
    <View className="h-full">
      <Navbar />
      <Fab size="lg"
      className="flex-1 items-center justify-center"
      >
        <Link href={{pathname: "/note/[id]", params: { id: "new" }}} className="h-full" >
          <Icon as={Plus} className="text-white h-6 w-6" />
        </Link>

      </Fab>
    </View>
  );
}
