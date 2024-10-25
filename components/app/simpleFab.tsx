import { Link, Href } from "expo-router";
import { Edit, Plus } from "lucide-react-native";
import { Pressable, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "../ui/icon";
import AnimatedBG from "./animatedbg";
import React from "react";

export function SimpleFab({ href }: { href: Href }) {

  const [pressed, setPressed] = React.useState(false);

  return (
    <View className="w-20 h-20 h-content flex items-center justify-center bg-hot-pink-500 absolute bottom-10 right-4 rounded-full "
        style={BottomBarStyle.bottomBar}
    >
      <View className="relative p-2">
        {pressed &&
        
          <AnimatedBG 
            viewStyles={{
              position: "absolute",
              
            }}
          />
        }

        <Link href={href} className="w-full h-full" asChild>
        <TouchableOpacity className="flex items-center justify-center flex-1 w-full h-full"
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
        >

            <Icon as={Plus} className="text-white w-8 h-8" color="#FFF"></Icon>
        </TouchableOpacity>
            
        </Link>
      </View>
    </View>
  )
}

const BottomBarStyle = StyleSheet.create({
    bottomBar: {

        bottom: 50,
    }
        
})