import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { VideoItem } from '../data/mockData';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../utils/theme';
import { formatDuration } from '../utils/helpers';

interface VideoCardProps {
  item: VideoItem;
  onPress: (item: VideoItem) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - SPACING.md * 3) / 2; // 2 columns with spacing
const CARD_HEIGHT = CARD_WIDTH * 1.5; // 2:3 aspect ratio

// Performance optimization: Memoize the card component to prevent unnecessary re-renders
export const VideoCard = memo(({ item, onPress }: VideoCardProps) => {
  const handlePress = () => onPress(item);

  return (
    <View style={styles.cardContainer}>
      {/* Poster Image with fade-in effect */}
      <Image
        source={{ uri: item.poster }}
        style={styles.poster}
        contentFit="cover"
        transition={200}
        recyclingKey={item.id}
      />
      
      {/* Duration badge overlay */}
      <View style={styles.durationBadge}>
        <Text style={styles.durationText}>{formatDuration(item.duration)}</Text>
      </View>
      
      {/* Title and category below poster */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {item.category}
        </Text>
      </View>
    </View>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for optimal performance
  // Only re-render if the item ID changes
  return prevProps.item.id === nextProps.item.id;
});

VideoCard.displayName = 'VideoCard';

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  poster: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: COLORS.surface,
  },
  durationBadge: {
    position: 'absolute',
    bottom: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.overlay,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  durationText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  infoContainer: {
    padding: SPACING.sm,
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  category: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.xs,
    fontWeight: '400',
  },
});

export default VideoCard;
