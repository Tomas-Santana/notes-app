import AnimatedBG from "../app/animatedbg";
import { TouchableOpacity } from "react-native-gesture-handler";

interface AnimatedBGButtonProps {
    onPress: () => void;
    children: React.ReactNode;
    glow? : boolean;
    touchableStyles: any;
    className?: string;
}

export function AnimatedBGButton({ onPress, children, glow, touchableStyles, className } : AnimatedBGButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className={"relative" + className}
        style={touchableStyles}
    >
      {
        glow && 
        <AnimatedBG
        viewStyles={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 5,
        }}
      ></AnimatedBG>}
      {children}
    </TouchableOpacity>
  );
}

export function AnimatedBorderButton({ onPress, children, touchableStyles } : AnimatedBGButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className="relative p-2"
        style={touchableStyles}
    >
      <AnimatedBG
        viewStyles={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 5,
          zIndex: -1,
        }}
      ></AnimatedBG>
      {children}
    </TouchableOpacity>
  );
}