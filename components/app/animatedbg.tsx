import React, { ReactNode, useEffect} from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut, useSharedValue, useDerivedValue, withRepeat, withTiming, interpolateColor } from 'react-native-reanimated';
import {
  Canvas,
  LinearGradient,
  Fill,
  // @ts-ignore
  interpolateColors,
  vec,
} from "@shopify/react-native-skia";

interface AnimatedBGProps {
  children?: ReactNode
  viewStyles?: any
  gradientWidth?: number
  gradientHeight?: number
  danger?: boolean
}

const loc = [0, 0.33, 0.66, 1];
export const colors = ['#ff65b3', '#ff59c0', '#ff4ecd', '#ff45d9', '#ff3fe6', '#f23cf2', '#d33ffe', '#ad46ff', '#7b4fff', '#0058ff', '#0060ff'];

const normalStartColors = [
  "rgba(0, 0, 255, 1)",
  "rgba(30, 144, 255, 1)", 
  "rgba(70, 130, 180, 1)", 
  "rgba(135, 206, 250, 1)",
];
const normalEndColors = [
  "rgba(138, 43, 226, 1)", 
  "rgba(148, 0, 211, 1)", 
  "rgba(153, 50, 204, 1)", 
  "rgba(218, 112, 214, 1)",
] as [string, string, string, string];

const dangerStartColors = [
  "rgb(245, 76, 64)",
  "rgb(242, 104, 94)",
  "rgb(242, 123, 114)",
  "rgb(250, 180, 175)",
];

const dangerEndColors = [
  "rgb(191, 48, 0)",
  "rgb(227, 74, 23)",
  "rgb(240, 107, 62)",
  "rgb(240, 107, 62)",
];


export default function AnimatedBG({ children, viewStyles, gradientHeight, gradientWidth, danger }: AnimatedBGProps) {
  const { width, height } = useWindowDimensions();
  const colorsIndex = useSharedValue(0);
  useEffect(() => {
    colorsIndex.value = withRepeat(
      withTiming(normalStartColors.length - 1, {
        duration: 4000,
      }),
      -1,
      true
    );
  }, [colorsIndex]);
  const startColors = danger ? dangerStartColors : normalStartColors;
  const endColors = danger ? dangerEndColors : normalEndColors;
  const gradientColors = useDerivedValue(() => {
    return [
      interpolateColors(colorsIndex.value, [0, 1, 2, 3], startColors),
      interpolateColors(colorsIndex.value, [0, 1, 2, 3], endColors),
    ];
  }, [colorsIndex]);
  return (
    <View style={[styles.container, viewStyles]}>
      <Canvas style={styles.canvas}>
        <Fill>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(
              gradientWidth ? gradientWidth : width, 
              gradientHeight ? gradientHeight : height
            )}
            colors={gradientColors}
          />
        </Fill>
      </Canvas>
      <View style={styles.childrenContainer}>
        {children}
      </View>
    </View>
  );
}

interface StaticBGProps {
  children?: ReactNode
  viewStyles?: any
  colors? : [string, string, string, string]
}

export function StaticBG({ children, viewStyles, colors = normalEndColors }
  : StaticBGProps
) {

  return (
    <Animated.View style={[styles.container, viewStyles]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <ExpoLinearGradient
        colors={normalEndColors}
        start={{ x: 0, y: -0.2071 }}
        end={{ x: 0, y: 1 }}
        locations={loc}
        style={styles.gradient}
      />
      {children}
    </Animated.View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    borderRadius: 5,
  },
  canvas: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  childrenContainer: {
    flex: 1,
    zIndex: 1,
  },
});