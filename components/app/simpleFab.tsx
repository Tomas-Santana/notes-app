import { Link, Href } from "expo-router";
import { Edit, Plus } from "lucide-react-native";
import { Pressable, StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "../ui/icon";
import AnimatedBG from "./animatedbg";
import React from "react";
import { StaticBG } from "./animatedbg";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export function SimpleFab({ href}: { href: Href }) {

  


  return (
    <View className=" h-content flex items-center justify-center absolute bottom-10 right-4 rounded-full shadow-lg overflow-hidden"
        style={BottomBarStyle.bottomBar}
    >
      <View className="w-full h-full"
        style={{padding: 4}}
      >

        <AnimatedBG
          gradientHeight={70}
          gradientWidth={70}
          viewStyles={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        />
      

        <Link href={href} className="w-full h-full" asChild>
        <AnimatedTouchableOpacity className="flex items-center justify-center flex-1 w-full h-full rounded-full"
            style={[{ zIndex: 10}]}
        >

            <Icon as={Plus} className="text-white w-8 h-8"></Icon>
        </AnimatedTouchableOpacity>
            
        </Link>
      </View>
    </View>
  )
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const BottomBarStyle = StyleSheet.create({
    bottomBar: {

        bottom: 50,
        width: 70,
        height: 70,
    }
        
})