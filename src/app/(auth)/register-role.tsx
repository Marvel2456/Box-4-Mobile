import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";

export default function RegisterRoleScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  const insets = useSafeAreaInsets();

  const handleSelectRole = (role: "buyer" | "agent") => {
    router.push({
      pathname: "/(auth)/register",
      params: { role },
    });
  };

  return (
    <ThemedView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.content}>
        <ThemedText style={styles.title}>What kind of user are you?</ThemedText>

        <TouchableOpacity
          style={[styles.roleButton, { backgroundColor: colors.buttonGrey }]}
          onPress={() => handleSelectRole("buyer")}
        >
          <ThemedText style={[styles.roleButtonText, { color: colors.text }]}>
            User
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, { backgroundColor: colors.buttonGrey }]}
          onPress={() => handleSelectRole("agent")}
        >
          <ThemedText style={[styles.roleButtonText, { color: colors.text }]}>
            Agent
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ThemedText style={[styles.backButtonText, { color: colors.text }]}>
            Back
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: Spacing.two,
    textAlign: "center",
  },
  roleButton: {
    width: "100%",
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  roleButtonText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  backButton: {
    marginTop: Spacing.four,
    padding: Spacing.two,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
