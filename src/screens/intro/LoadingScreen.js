import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";
import { useTheme } from "react-native-paper";

export default function LoadingScreen() {
    const theme = useTheme();

    // Animated values
    const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale is 1
    const bgColorAnim = useRef(new Animated.Value(0)).current; // Initial background color is white (0)

    useEffect(() => {
        // Delay before starting the animation
        const timer = setTimeout(() => {
            // Run the animations in parallel
            Animated.parallel([
                // Scale animation
                Animated.timing(scaleAnim, {
                    toValue: 1.5, // Scale to 1.5x
                    duration: 2000, // 2 seconds
                    useNativeDriver: true, // Use native driver for performance
                }),
                // Background color animation
                Animated.timing(bgColorAnim, {
                    toValue: 1, // Animate to 1 (fully primary)
                    duration: 2000, // 2 seconds
                    useNativeDriver: false, // Can't use native driver for color animations
                }),
            ]).start();
        }, 4000); // 4 seconds delay

        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, [scaleAnim, bgColorAnim]);

    // Interpolate the background color from white to blue
    const backgroundColor = bgColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.colors.secondary, theme.colors.primary],
    });

    return (
        <Animated.View style={{ ...styles.container, backgroundColor }}>
            <Animated.Image
                source={require('@/images/logo-splash.png')}
                style={{ width: 36, height: 36, transform: [{ scale: scaleAnim }] }}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
