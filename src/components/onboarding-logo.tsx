import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';

export function OnboardingLogo() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <ThemedText style={[styles.boxText, { color: colors.tintRed }]}>BOX</ThemedText>
        <ThemedText style={[styles.numberText, { color: colors.tintBlue }]}>4</ThemedText>
      </View>
      <ThemedText style={[styles.subText, { color: colors.tintBlue }]}>REAL ESTATE HUB</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  boxText: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -1,
  },
  numberText: {
    fontSize: 28,
    fontWeight: '900',
    marginLeft: 2,
    letterSpacing: -1,
  },
  subText: {
    fontSize: 8,
    fontWeight: '700',
    marginTop: -4,
    letterSpacing: 0.5,
  },
});
