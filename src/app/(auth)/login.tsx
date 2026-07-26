import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { OnboardingLogo } from "@/components/onboarding-logo";
import { PaginationDots } from "@/components/pagination-dots";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";
import { useAuth } from "@/context/auth-context";
import { useColorScheme } from "react-native";

const { width } = Dimensions.get("window");

const ONBOARDING_DATA = [
  {
    title: "Where Property Search Meets Simplicity.",
    subtitle: "Home starts here.",
  },
  {
    title: "Discover and list the best property at the best prices.",
    subtitle: "Home starts here.",
  },
  {
    title: "Discover and list the best property at the best prices.",
    subtitle: "Home starts here.",
  },
];

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    if (currentIndex !== step) {
      setStep(currentIndex);
    }
  };

  // Navigation handlers
  const skipToLast = () => {
    scrollViewRef.current?.scrollTo({ x: width * 2, animated: true });
  };

  const handleRegister = () => {
    router.push("/(auth)/register-role");
  };

  const handleLoginNav = () => {
    router.push("/(auth)/login-form");
  };

  return (
    <ThemedView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* Top Header */}
      <View style={styles.header}>
        <OnboardingLogo />
        {step < 2 && (
          <TouchableOpacity
            style={[styles.skipButton, { backgroundColor: colors.buttonGrey }]}
            onPress={skipToLast}
          >
            <ThemedText style={styles.skipText}>skip</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {/* Swipeable Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {/* Step 0 */}
        <View style={[styles.page, { width }]}>
          <Image
            source={require("@/assets/images/onboarding/onboardingIllustration1.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        {/* Step 1 */}
        <View style={[styles.page, { width }]}>
          <Image
            source={require("@/assets/images/onboarding/onboardingIllustration2.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        {/* Step 2 */}
        <View style={[styles.page, { width }]}>
          <View style={styles.roleSelectionContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                {
                  backgroundColor: colors.tintRed,
                },
              ]}
              onPress={handleRegister}
            >
              <ThemedText
                style={[
                  styles.roleButtonText,
                  { color: "#fff" },
                ]}
              >
                Register
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                {
                  backgroundColor: colors.buttonGrey,
                },
              ]}
              onPress={handleLoginNav}
            >
              <ThemedText
                style={[
                  styles.roleButtonText,
                  { color: colors.text },
                ]}
              >
                Log{"\u00A0"}In
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <ThemedText style={styles.titleText}>
          {ONBOARDING_DATA[step].title}
        </ThemedText>
        <ThemedText style={styles.subtitleText}>
          {ONBOARDING_DATA[step].subtitle}
        </ThemedText>

        <View style={styles.dotsContainer}>
          <PaginationDots total={3} current={step} />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    height: 60,
  },
  skipButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 20,
  },
  skipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.four,
  },
  illustrationImage: {
    width: "100%",
    height: 350,
  },
  roleSelectionContainer: {
    width: "100%",
    alignItems: "center",
    gap: Spacing.four,
  },
  roleTitle: {
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
  bottomSection: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: Spacing.one,
  },
  subtitleText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  dotsContainer: {
    marginVertical: Spacing.four,
  },
  getStartedButton: {
    width: "100%",
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.two,
  },
  getStartedText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
