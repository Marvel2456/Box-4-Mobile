import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";
import { AuthService } from "@/services/auth.service";

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  let { role } = useLocalSearchParams<{ role: "agent" | "buyer" }>();

  // Fallback in case of development reloads where params are lost
  if (!role) {
    role = "buyer";
  }

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await AuthService.register({
        role,
        full_name: fullName,
        email,
        password,
      });
      // Navigate to verify OTP
      router.replace({
        pathname: "/(auth)/verify-otp",
        params: { email },
      });
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.headerContainer}>
            <ThemedText style={styles.title}>
              Create your{" "}
              <ThemedText style={styles.titleHighlight}>account</ThemedText>
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Create a new account
            </ThemedText>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor="#A0A0A0"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#777"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
            </View>

            <View style={styles.formOptionsRow}>
              <TouchableOpacity>
                <ThemedText style={styles.termsText}>
                  Terms of service
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <ThemedText style={styles.showPasswordText}>
                  Show password
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={[
              styles.registerButton,
              { backgroundColor: Colors.light.tintRed },
            ]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.registerButtonText}>
                Register
              </ThemedText>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.two,
  },
  headerContainer: {
    marginTop: Spacing.six,
    marginBottom: Spacing.six,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E1E2D",
  },
  titleHighlight: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E52020", // Red color matching the screenshot
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: Spacing.one,
    fontWeight: "500",
  },
  formContainer: {
    gap: Spacing.three,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F6F8",
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    height: 56,
  },
  inputIcon: {
    marginRight: Spacing.two,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  formOptionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.one,
  },
  termsText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3c87f7",
  },
  showPasswordText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3c87f7",
  },
  registerButton: {
    width: "100%",
    height: 56,
    borderRadius: Spacing.two,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60, // Push it down
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
