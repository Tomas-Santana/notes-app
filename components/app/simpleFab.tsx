import { Link, Href } from "expo-router";
import { Edit, Plus } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Icon } from "../ui/icon";

export function SimpleFab({ href }: { href: Href }) {
  return (
    <View className="w-20 h-20 h-content flex items-center justify-center bg-bitpurple-600 absolute bottom-42 right-4 rounded-full"
        style={BottomBarStyle.bottomBar}
    >
        <Link href={href} className="w-full h-full" asChild>
        <Pressable className="flex items-center justify-center flex-1 w-full h-full">

            <Icon as={Plus} className="text-white w-8 h-8" color="#FFF"></Icon>
        </Pressable>
            
        </Link>
    </View>
  )
}

const BottomBarStyle = StyleSheet.create({
    bottomBar: {

        bottom: 100,
    }
        
})