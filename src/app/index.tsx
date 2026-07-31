import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useAuthStore } from '@/store/auth.store';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

export default function IndexScreen() {
  const { access, role } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  useEffect(() => {
    setMounted(true);
    // Listen for hydration
    const unsubHydrate = useAuthStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useAuthStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
    };
  }, []);

  if (!mounted || !hydrated) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color={colors.tint} />
      </ThemedView>
    );
  }

  if (!access) {
    return <Redirect href="/(auth)/login" />;
  }

  if (role === 'agent') {
    return <Redirect href="/(agent)" />;
  }

  return <Redirect href="/(user)" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
