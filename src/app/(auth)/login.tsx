import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import { useAuth } from '@/context/auth-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing, Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  const handleLogin = (role: 'agent' | 'user') => {
    login(role);
    router.replace(role === 'agent' ? '/(agent)' : '/(user)');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Welcome</ThemedText>
      <ThemedText style={styles.subtitle}>Please log in to continue</ThemedText>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.tint} style={styles.loader} />
      ) : (
        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.tint }]} 
            onPress={() => handleLogin('user')}
          >
            <ThemedText style={styles.buttonText}>Login as User</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.agentButton, { borderColor: colors.tint }]} 
            onPress={() => handleLogin('agent')}
          >
            <ThemedText style={[styles.buttonText, { color: colors.tint }]}>Login as Agent</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  title: {
    marginBottom: Spacing.one,
  },
  subtitle: {
    marginBottom: Spacing.six,
    opacity: 0.7,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: Spacing.three,
  },
  button: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    marginTop: Spacing.four,
  }
});
