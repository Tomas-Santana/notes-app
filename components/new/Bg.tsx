import CircleBgSvg from "@/assets/images/circle_bg.svg";
import AnimatedBG from "@/components/app/animatedbg";
import { View } from "react-native";

export function Bg() {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
    >
      <AnimatedBG
        viewStyles={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      ></AnimatedBG>
      <CircleBgSvg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
        }}
      ></CircleBgSvg>
    </View>
  );
}
