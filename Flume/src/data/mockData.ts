// Mock video feed data - no backend required
// Replace the API_URL in src/utils/api.ts to use a real backend

export interface VideoItem {
  id: string;
  title: string;
  poster: string;
  videoUrl: string; // HLS (.m3u8) or DASH URL
  duration: number; // seconds
  category: string;
}

export const MOCK_FEED: VideoItem[] = [
  {
    id: '1',
    title: 'Nature\'s Wonders',
    poster: 'https://picsum.photos/seed/nature/400/600',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 185,
    category: 'Documentary',
  },
  {
    id: '2',
    title: 'Urban Adventures',
    poster: 'https://picsum.photos/seed/city/400/600',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 240,
    category: 'Travel',
  },
  {
    id: '3',
    title: 'Tech Innovations',
    poster: 'https://picsum.photos/seed/tech/400/600',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 320,
    category: 'Technology',
  },
  {
    id: '4',
    title: 'Culinary Delights',
    poster: 'https://picsum.photos/seed/food/400/600',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 420,
    category: 'Food',
  },
  {
    id: '5',
    title: 'Ocean Depths',
    poster: 'https://picsum.photos/seed/ocean/400/600',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 275,
    category: 'Documentary',
  },
  {
    id: '6',
    title: 'Mountain Peaks',
    poster: 'https://picsum.photos/seed/mountain/400/600',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 195,
    category: 'Travel',
  },
  {
    id: '7',
    title: 'Space Exploration',
    poster: 'https://picsum.photos/seed/space/400/600',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 380,
    category: 'Science',
  },
  {
    id: '8',
    title: 'Wildlife Safari',
    poster: 'https://picsum.photos/seed/wildlife/400/600',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 290,
    category: 'Documentary',
  },
  {
    id: '9',
    title: 'Art & Culture',
    poster: 'https://picsum.photos/seed/art/400/600',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 210,
    category: 'Culture',
  },
  {
    id: '10',
    title: 'Fitness Journey',
    poster: 'https://picsum.photos/seed/fitness/400/600',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 150,
    category: 'Health',
  },
  {
    id: '11',
    title: 'Music Festivals',
    poster: 'https://picsum.photos/seed/music/400/600',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 340,
    category: 'Music',
  },
  {
    id: '12',
    title: 'Historical Mysteries',
    poster: 'https://picsum.photos/seed/history/400/600',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 400,
    category: 'History',
  },
];

export const CATEGORIES = [
  'All',
  'Documentary',
  'Travel',
  'Technology',
  'Food',
  'Science',
  'Culture',
  'Health',
  'Music',
  'History',
];
