import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { Image } from 'expo-image';
import { VideoItem } from '../data/mockData';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../utils/theme';
import { formatDuration } from '../utils/helpers';
import { saveProgress } from '../utils/storage';

interface VideoPlayerProps {
  item: VideoItem;
  isFocused: boolean; // Whether this player is currently visible/focused
  onProgress?: (videoId: string, position: number, duration: number) => void;
  onLoad?: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const VideoPlayer = ({ item, isFocused, onProgress, onLoad }: VideoPlayerProps) => {
  const videoRef = useRef<VideoRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-play when focused, pause when not focused (TikTok-style behavior)
  useEffect(() => {
    if (isFocused) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        videoRef.current?.seek(currentPosition);
        videoRef.current?.resume();
        setIsPlaying(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isFocused]);

  // Hide controls after a few seconds of inactivity
  const handleTouch = useCallback(() => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.resume();
    }
    setIsPlaying(!isPlaying);
    handleTouch();
  }, [isPlaying, handleTouch]);

  const handleProgress = useCallback((data: any) => {
    const { currentTime } = data;
    setCurrentPosition(currentTime);
    onProgress?.(item.id, currentTime, duration);
  }, [item.id, duration, onProgress]);

  const handleLoad = useCallback((data: any) => {
    setDuration(data.duration);
    onLoad?.();
  }, [onLoad]);

  const handleEnd = useCallback(() => {
    setIsPlaying(false);
    setShowControls(true);
  }, []);

  const seekTo = useCallback((position: number) => {
    videoRef.current?.seek(position);
    setCurrentPosition(position);
  }, []);

  // Release resources when component unmounts
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: item.videoUrl }}
        style={styles.video}
        resizeMode="cover"
        paused={!isFocused || !isPlaying}
        progressUpdateInterval={500}
        onProgress={handleProgress}
        onLoad={handleLoad}
        onEnd={handleEnd}
        bufferConfig={{
          minBufferMs: 2500,
          maxBufferMs: 15000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
        playInBackground={false}
        playWhenInactive={false}
        ignoreSilentSwitch="ignore"
      />

      {/* Tap overlay for controls */}
      <TouchableOpacity 
        style={styles.overlay} 
        onPress={togglePlayPause}
        activeOpacity={1}
      />

      {/* Controls overlay */}
      {showControls && (
        <View style={styles.controlsContainer}>
          {/* Top bar with title */}
          <View style={styles.topBar}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          </View>

          {/* Center play/pause indicator */}
          {!isPlaying && (
            <View style={styles.playIndicator}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
          )}

          {/* Bottom bar with scrubber */}
          <View style={styles.bottomBar}>
            <View style={styles.scrubberContainer}>
              <View style={styles.scrubberTrack}>
                <View 
                  style={[
                    styles.scrubberFill, 
                    { width: duration > 0 ? `${(currentPosition / duration) * 100}%` : '0%' }
                  ]} 
                />
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatDuration(Math.floor(currentPosition))}</Text>
                <Text style={styles.timeText}>{formatDuration(duration)}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#000',
  },
  video: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  controlsContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 2,
    justifyContent: 'space-between',
  },
  topBar: {
    paddingTop: SPACING.xl * 2,
    paddingHorizontal: SPACING.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
  },
  playIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 64,
    color: COLORS.text,
    opacity: 0.8,
  },
  bottomBar: {
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrubberContainer: {
    gap: SPACING.sm,
  },
  scrubberTrack: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  scrubberFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.xs,
    fontWeight: '500',
  },
});

export default VideoPlayer;
