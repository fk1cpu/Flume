import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { VideoItem } from '../data/mockData';
import VideoCard from '../components/VideoCard';
import CategoryPill from '../components/CategoryPill';
import { COLORS, SPACING } from '../utils/theme';
import { fetchVideos, filterByCategory, searchVideos } from '../utils/helpers';

interface HomeScreenProps {
  onVideoPress: (item: VideoItem) => void;
}

export const HomeScreen = ({ onVideoPress }: HomeScreenProps) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Load videos on mount
  useFocusEffect(
    useCallback(() => {
      loadVideos();
    }, [])
  );

  const loadVideos = async () => {
    try {
      setLoading(true);
      const data = await fetchVideos();
      setVideos(data);
      setFilteredVideos(data);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadVideos();
  }, []);

  // Filter videos when category or search changes
  useMemo(() => {
    let result = videos;
    
    if (selectedCategory !== 'All') {
      result = filterByCategory(result, selectedCategory);
    }
    
    if (searchQuery.trim()) {
      result = searchVideos(result, searchQuery);
    }
    
    setFilteredVideos(result);
  }, [videos, selectedCategory, searchQuery]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleVideoPress = useCallback((item: VideoItem) => {
    onVideoPress(item);
  }, [onVideoPress]);

  const renderVideoCard = useCallback(({ item }: { item: VideoItem }) => (
    <VideoCard 
      item={item} 
      onPress={handleVideoPress}
    />
  ), [handleVideoPress]);

  const keyExtractor = useCallback((item: VideoItem) => item.id, []);

  const renderHeader = useMemo(() => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Flume</Text>
      {/* Category pills - horizontal scroll */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={['All', 'Documentary', 'Travel', 'Technology', 'Food', 'Science', 'Culture', 'Health', 'Music', 'History']}
        keyExtractor={(cat) => cat}
        renderItem={({ item: category }) => (
          <CategoryPill
            label={category}
            isSelected={selectedCategory === category}
            onPress={() => handleCategorySelect(category)}
          />
        )}
        contentContainerStyle={styles.categoriesContainer}
      />
    </View>
  ), [selectedCategory, handleCategorySelect]);

  if (loading && videos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredVideos}
        renderItem={renderVideoCard}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.accent}
            colors={[COLORS.accent]}
          />
        }
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No videos found</Text>
          </View>
        }
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        updateCellsBatchingPeriod={100}
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
  headerContainer: {
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  categoriesContainer: {
    paddingHorizontal: SPACING.xs,
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

export default HomeScreen;
