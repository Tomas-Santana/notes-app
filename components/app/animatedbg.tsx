import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AnimatedBGProps {
  children?: ReactNode
}

const loc = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
let timeout: NodeJS.Timeout | undefined = undefined;

export default function AnimatedBG({ children }: AnimatedBGProps) {
  let [gradientOptions, setGradientOptions] = useState({
    colors: ['#ff65b3', '#ff59c0', '#ff4ecd', '#ff45d9', '#ff3fe6', '#f23cf2', '#d33ffe', '#ad46ff', '#7b4fff', '#0058ff', '#0060ff'],
    start: { x: 0.5, y: -0.2071 },
    locations: loc,
    end: { x: 0.5, y: 1 },
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
    timeout = setInterval(infinite, 50); // Ajuste del intervalo para una animación más suave
    return () => clearInterval(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientOptions.colors}
        start={gradientOptions.start}
        end={gradientOptions.end}
        locations={gradientOptions.locations}
        style={styles.gradient}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});