import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface AnimatedBGProps {
  children?: ReactNode
  viewStyles?: any
  move?: boolean
}

const loc = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
let timeout: NodeJS.Timeout | undefined = undefined;
export const colors = ['#ff65b3', '#ff59c0', '#ff4ecd', '#ff45d9', '#ff3fe6', '#f23cf2', '#d33ffe', '#ad46ff', '#7b4fff', '#0058ff', '#0060ff'];
export const synthColors = ['#ffd319', '#ff901f', '#ff2975', '#f222ff', '#ff3fe6', '#8c1eff'];


export default function AnimatedBG({ children, viewStyles, move = true }: AnimatedBGProps) {
  let [gradientOptions, setGradientOptions] = useState({
    colors: ['#ff65b3', '#ff59c0', '#ff4ecd', '#ff45d9', '#ff3fe6', '#f23cf2', '#d33ffe', '#ad46ff', '#7b4fff', '#0058ff', '#0060ff'],
    start: { x: 0, y: -0.2071 },
    locations: loc,
    end: { x: 0, y: 1 },
  });

  const movement = 0.005; // Ajuste del movimiento para una animación más suave

  const gradientOptionsRef = useRef(gradientOptions);
  gradientOptionsRef.current = gradientOptions;

  let infinite = () => {
    let newLocations = gradientOptionsRef.current.locations.map(loc => loc - movement);
    if (newLocations[1] <= 0) {
      newLocations = loc;
      let gradientColors = [...gradientOptionsRef.current.colors];
      gradientColors.push(gradientColors.shift()!);
      setGradientOptions({
        ...gradientOptionsRef.current,
        colors: gradientColors,
        locations: newLocations,
      });
    } else {
      setGradientOptions({
        ...gradientOptionsRef.current,
        locations: newLocations,
      });
    }
  };

  useEffect(() => {
    if (!move) return
    timeout = setInterval(infinite, 50); // Ajuste del intervalo para una animación más suave
    return () => clearInterval(timeout);
  }, []);

  return (
    <Animated.View style={[styles.container, viewStyles]}
      entering={FadeIn}
      exiting={FadeOut}

    >
      <LinearGradient
        colors={gradientOptions.colors}
        start={gradientOptions.start}
        end={gradientOptions.end}
        locations={gradientOptions.locations}
        style={styles.gradient}
      />
      {children}
    </Animated.View>
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
      <LinearGradient
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
});