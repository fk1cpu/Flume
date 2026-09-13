import { VideoItem } from '../data/mockData';

// Format duration in seconds to MM:SS or HH:MM:SS
export const formatDuration = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Simple async function to simulate API fetch
// Replace with actual fetch call when using a real backend
export const fetchVideos = async (): Promise<VideoItem[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const { MOCK_FEED } = await import('../data/mockData');
  return MOCK_FEED;
};

// Filter videos by category
export const filterByCategory = (videos: VideoItem[], category: string): VideoItem[] => {
  if (category === 'All') {
    return videos;
  }
  return videos.filter(video => video.category === category);
};

// Search videos by title
export const searchVideos = (videos: VideoItem[], query: string): VideoItem[] => {
  if (!query.trim()) {
    return videos;
  }
  const lowerQuery = query.toLowerCase();
  return videos.filter(video => 
    video.title.toLowerCase().includes(lowerQuery) ||
    video.category.toLowerCase().includes(lowerQuery)
  );
};
