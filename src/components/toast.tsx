import React, { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";

export interface ToastRef {
  show: (message: string, type?: "success" | "error" | "info") => void;
}

export const Toast = forwardRef<ToastRef, {}>((props, ref) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info">("info");
  const translateY = useRef(new Animated.Value(-100)).current; // Start hidden above
  const insets = useSafeAreaInsets();

  useImperativeHandle(ref, () => ({
    show: (msg: string, msgType: "success" | "error" | "info" = "info") => {
      setMessage(msg);
      setType(msgType);

      // Slide in
      Animated.timing(translateY, {
        toValue: insets.top + 10,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Wait for 1 second, then slide out
        setTimeout(() => {
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 1000);
      });
    },
  }));

  let backgroundColor = "#333";
  if (type === "success") backgroundColor = "#4CAF50";
  if (type === "error") backgroundColor = "#E52020";

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor, transform: [{ translateY }] },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
