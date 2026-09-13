import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'expo-image';
import { VideoItem } from '../data/mockData';
import VideoCard from '../components/VideoCard';
import { COLORS, SPACING, FONT_SIZES } from '../utils/theme';
import { getAllProgress, VideoProgress } from '../utils/storage';
import { MOCK_FEED } from '../data/mockData';

interface LibraryScreenProps {
  onVideoPress: (item: VideoItem) => void;
}

export const LibraryScreen = ({ onVideoPress }: LibraryScreenProps) => {
  const [continueWatching, setContinueWatching] = useState<Array<{ video: VideoItem; progress: VideoProgress }>>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadLibrary();
    }, [])
  );

  const loadLibrary = async () => {
    try {
      setLoading(true);
      const progress = await getAllProgress();
      
      // Match progress with video items
      const videosWithProgress = progress
        .map(p => {
          const video = MOCK_FEED.find(v => v.id === p.videoId);
          if (!video) return null;
          return { video, progress: p };
        })
        .filter((item): item is { video: VideoItem; progress: VideoProgress } => item !== null)
        .sort((a, b) => b.progress.lastWatched - a.progress.lastWatched);
      
      setContinueWatching(videosWithProgress);
    } catch (error) {
      console.error('Error loading library:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPress = useCallback((item: VideoItem) => {
    onVideoPress(item);
  }, [onVideoPress]);

  const renderVideoCard = useCallback(({ item }: { item: { video: VideoItem; progress: VideoProgress } }) => (
    <View style={styles.cardWrapper}>
      <VideoCard 
        item={item.video} 
        onPress={handleVideoPress}
      />
      {/* Progress indicator */}
      <View style={styles.progressIndicator}>
        <View style={styles.progressTrack}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${Math.min((item.progress.position / item.progress.duration) * 100, 100)}%` }
            ]} 
          />
        </View>
      </View>
    </View>
  ), [handleVideoPress]);

  const keyExtractor = useCallback((item: { video: VideoItem; progress: VideoProgress }) => item.video.id, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={continueWatching}
        renderItem={renderVideoCard}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <Text style={styles.title}>Continue Watching</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recently watched videos</Text>
          </View>
        }
        removeClippedSubviews={true}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    color: COLORS.text,
    fontSize: 16,
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  cardWrapper: {
    marginBottom: SPACING.md,
  },
  progressIndicator: {
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  progressTrack: {
    height: 3,
    backgroundColor: COLORS.surface,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
});

export default LibraryScreen;
