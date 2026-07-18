import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/context/auth-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing, Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';
import { OnboardingLogo } from '@/components/onboarding-logo';
import { PaginationDots } from '@/components/pagination-dots';

const { width } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    title: 'Where Property Search Meets Simplicity.',
    subtitle: 'Home starts here.',
  },
  {
    title: 'Discover and list the best property at the best prices.',
    subtitle: 'Home starts here.',
  },
  {
    title: 'Discover and list the best property at the best prices.',
    subtitle: 'Home starts here.',
  }
];

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];
  const insets = useSafeAreaInsets();
  
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<'agent' | 'user' | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    if (currentIndex !== step) {
      setStep(currentIndex);
    }
  };

  const skipToLast = () => {
    scrollViewRef.current?.scrollTo({ x: width * 2, animated: true });
  };

  const handleLogin = () => {
    if (!selectedRole) return;
    login(selectedRole);
    router.replace(selectedRole === 'agent' ? '/(agent)' : '/(user)');
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
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
          <View style={styles.illustrationPlaceholder}>
            <ThemedText style={{ color: colors.textSecondary }}>[ Illustration Placeholder 1 ]</ThemedText>
          </View>
        </View>

        {/* Step 1 */}
        <View style={[styles.page, { width }]}>
          <View style={styles.illustrationPlaceholder}>
            <ThemedText style={{ color: colors.textSecondary }}>[ Illustration Placeholder 2 ]</ThemedText>
          </View>
        </View>

        {/* Step 2 */}
        <View style={[styles.page, { width }]}>
          <View style={styles.roleSelectionContainer}>
            <ThemedText style={styles.roleTitle}>What kind of user are you?</ThemedText>
            
            <TouchableOpacity 
              style={[
                styles.roleButton, 
                { backgroundColor: selectedRole === 'user' ? colors.tintBlue : colors.buttonGrey }
              ]}
              onPress={() => setSelectedRole('user')}
            >
              <ThemedText style={[styles.roleButtonText, { color: selectedRole === 'user' ? '#fff' : colors.text }]}>
                Buyer
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.roleButton, 
                { backgroundColor: selectedRole === 'agent' ? colors.tintBlue : colors.buttonGrey }
              ]}
              onPress={() => setSelectedRole('agent')}
            >
              <ThemedText style={[styles.roleButtonText, { color: selectedRole === 'agent' ? '#fff' : colors.text }]}>
                Agent
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <ThemedText style={styles.titleText}>{ONBOARDING_DATA[step].title}</ThemedText>
        <ThemedText style={styles.subtitleText}>{ONBOARDING_DATA[step].subtitle}</ThemedText>
        
        <View style={styles.dotsContainer}>
          <PaginationDots total={3} current={step} />
        </View>

        {step === 2 && (
          <TouchableOpacity 
            style={[
              styles.getStartedButton, 
              { backgroundColor: colors.tintRed, opacity: selectedRole ? 1 : 0.5 }
            ]}
            onPress={handleLogin}
            disabled={!selectedRole || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.getStartedText}>Get Started</ThemedText>
            )}
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },
  illustrationPlaceholder: {
    width: '80%',
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  roleSelectionContainer: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.four,
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: Spacing.two,
    textAlign: 'center',
  },
  roleButton: {
    width: '100%',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
  },
  roleButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  bottomSection: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.one,
  },
  subtitleText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  dotsContainer: {
    marginVertical: Spacing.four,
  },
  getStartedButton: {
    width: '100%',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
