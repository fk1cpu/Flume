import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import { VideoItem } from '../data/mockData';
import { saveProgress } from '../utils/storage';

interface PlayerScreenProps {
  route: {
    params: {
      video: VideoItem;
    };
  };
}

export const PlayerScreen = ({ route }: PlayerScreenProps) => {
  const video = route.params.video;
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Handle progress updates from the video player
  const handleProgress = useCallback((videoId: string, position: number, videoDuration: number) => {
    setCurrentPosition(position);
    setDuration(videoDuration);
    
    // Save progress every 5 seconds
    if (Math.floor(position) % 5 === 0) {
      saveProgress(videoId, position, videoDuration);
    }
  }, []);

  // Save progress when component unmounts or video changes
  useEffect(() => {
    return () => {
      if (currentPosition > 0 && duration > 0) {
        saveProgress(video.id, currentPosition, duration);
      }
    };
  }, [video.id, currentPosition, duration]);

  return (
    <View style={styles.container}>
      <VideoPlayer
        item={video}
        isFocused={true}
        onProgress={handleProgress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default PlayerScreen;
