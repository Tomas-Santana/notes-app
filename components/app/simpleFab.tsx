import { Link, Href } from "expo-router";
import { Edit, Plus } from "lucide-react-native";
import { Pressable, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "../ui/icon";

export function SimpleFab({ href }: { href: Href }) {
  return (
    <View className="w-20 h-20 h-content flex items-center justify-center bg-bitpurple-600 absolute bottom-10 right-4 rounded-full "
        style={BottomBarStyle.bottomBar}
    >
        <Link href={href} className="w-full h-full" asChild>
        <TouchableOpacity className="flex items-center justify-center flex-1 w-full h-full active:scale-[.95]">

            <Icon as={Plus} className="text-white w-8 h-8" color="#FFF"></Icon>
        </TouchableOpacity>
            
        </Link>
    </View>
  )
}

const BottomBarStyle = StyleSheet.create({
    bottomBar: {

        bottom: 100,
    }
        
})