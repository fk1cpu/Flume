import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = 'video_progress';

export interface VideoProgress {
  videoId: string;
  position: number; // seconds
  duration: number; // total seconds
  lastWatched: number; // timestamp
}

// Get all saved progress
export const getAllProgress = async (): Promise<VideoProgress[]> => {
  try {
    const data = await AsyncStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading progress:', error);
    return [];
  }
};

// Save progress for a video
export const saveProgress = async (videoId: string, position: number, duration: number): Promise<void> => {
  try {
    const allProgress = await getAllProgress();
    const existingIndex = allProgress.findIndex(p => p.videoId === videoId);
    
    const newProgress: VideoProgress = {
      videoId,
      position,
      duration,
      lastWatched: Date.now(),
    };

    if (existingIndex >= 0) {
      allProgress[existingIndex] = newProgress;
    } else {
      allProgress.push(newProgress);
    }

    // Keep only the most recent 50 items
    const sorted = allProgress.sort((a, b) => b.lastWatched - a.lastWatched).slice(0, 50);
    
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(sorted));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

// Get progress for a specific video
export const getProgress = async (videoId: string): Promise<VideoProgress | null> => {
  try {
    const allProgress = await getAllProgress();
    return allProgress.find(p => p.videoId === videoId) || null;
  } catch (error) {
    console.error('Error loading progress:', error);
    return null;
  }
};

// Clear progress for a specific video
export const clearProgress = async (videoId: string): Promise<void> => {
  try {
    const allProgress = await getAllProgress();
    const filtered = allProgress.filter(p => p.videoId !== videoId);
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
};

// Clear all progress
export const clearAllProgress = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PROGRESS_KEY);
  } catch (error) {
    console.error('Error clearing all progress:', error);
  }
};
