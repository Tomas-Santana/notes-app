import { User } from "lucide-react-native";
import { Avatar} from "../ui/avatar";
import { Icon } from "../ui/icon";
import { Pressable, View } from "react-native";
import { router } from "expo-router";

export function Navbar() {
    return (
        <View className="w-full p-4 pt-0 items-end">
            <View >
                <Pressable onPress={ () => router.push(`/profile/1/settings`) }>
                    <Avatar size="md" className="border-2 border-bitpurple-600 bg-bitpurple-200">
                        <Icon as={User} className="text-bitpurple-600 w-6 h-6" />
                    </Avatar>
                </Pressable>
            </View>
        </View>
    )
}