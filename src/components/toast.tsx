import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";

export interface ToastRef {
  show: (message: string, type?: "success" | "error" | "info") => void;
}

export const Toast = forwardRef<ToastRef, {}>((props, ref) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info">("info");
  const [isVisible, setIsVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useImperativeHandle(ref, () => ({
    show: (msg: string, msgType: "success" | "error" | "info" = "info") => {
      setMessage(msg);
      setType(msgType);
      setIsVisible(true);

      // Pop in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Wait for 1 second, then pop out
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 0.8,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start(() => {
            setIsVisible(false);
          });
        }, 1000);
      });
    },
  }));

  if (!isVisible) return null;

  let textColor = "#333";
  if (type === "success") textColor = "#4CAF50";
  if (type === "error") textColor = "#E52020";

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.popupBox, { opacity, transform: [{ scale }] }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{message}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  popupBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -100,
    marginTop: -100,
    width: 210,
    height: 210,
    backgroundColor: "#ffffffed",
    borderRadius: 2,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.25,
    // shadowRadius: 20,
    // elevation: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
