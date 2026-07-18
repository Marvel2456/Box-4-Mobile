import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useAuth } from '@/context/auth-context';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

export default function IndexScreen() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color={colors.tint} />
      </ThemedView>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  if (user.role === 'agent') {
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
