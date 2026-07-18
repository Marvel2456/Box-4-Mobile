import React, { useRef, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { FeaturedCard, FeaturedProperty } from './featured-card';

interface FeaturesProps {
  listings: FeaturedProperty[];
}

export function Features({ listings }: FeaturesProps) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!listings || listings.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % listings.length;
        
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [listings.length]);

  return (
    <FlatList
      ref={flatListRef}
      data={listings}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <FeaturedCard property={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    // We remove the horizontal margins here because the items have marginRight,
    // and we can manage the padding in the parent or here if needed.
  },
});
