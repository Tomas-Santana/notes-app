import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut, useSharedValue, useDerivedValue, withRepeat, withTiming } from 'react-native-reanimated';
import {
  Canvas,
  LinearGradient,
  Fill,
  interpolateColors,
  vec,
} from "@shopify/react-native-skia";

interface AnimatedBGProps {
  children?: ReactNode
  viewStyles?: any
}

const loc = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
export const colors = ['#ff65b3', '#ff59c0', '#ff4ecd', '#ff45d9', '#ff3fe6', '#f23cf2', '#d33ffe', '#ad46ff', '#7b4fff', '#0058ff', '#0060ff'];

const startColors = [
  "rgba(0, 0, 255, 1)",
  "rgba(30, 144, 255, 1)", 
  "rgba(70, 130, 180, 1)", 
  "rgba(135, 206, 250, 1)",
];
const endColors = [
  "rgba(138, 43, 226, 1)", 
  "rgba(148, 0, 211, 1)", 
  "rgba(153, 50, 204, 1)", 
  "rgba(218, 112, 214, 1)",
];


export default function AnimatedBG({ children, viewStyles }: AnimatedBGProps) {
  const { width, height } = useWindowDimensions();
  const colorsIndex = useSharedValue(0);
  useEffect(() => {
    colorsIndex.value = withRepeat(
      withTiming(startColors.length - 1, {
        duration: 4000,
      }),
      -1,
      true
    );
  }, [colorsIndex]);
  const gradientColors = useDerivedValue(() => {
    return [
      interpolateColors(colorsIndex.value, [0, 1, 2, 3], startColors),
      interpolateColors(colorsIndex.value, [0, 1, 2, 3], endColors),
    ];
  }, [colorsIndex]);
  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Fill>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
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

export function StaticBG({ children, viewStyles }
  : AnimatedBGProps
) {
  return (
    <Animated.View style={[styles.container, viewStyles]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <ExpoLinearGradient
        colors={colors}
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