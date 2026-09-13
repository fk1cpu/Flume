// Real free HLS/MP4 streams for testing (No Auth Required)
// These are public domain/open license videos from Blender Foundation, Google, etc.
// In production, replace this array with a fetch() call to your preferred API

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  poster: string;
  videoUrl: string; // HLS (.m3u8) or MP4 URL
  duration: number; // seconds
  category: string;
}

export const MOCK_FEED: VideoItem[] = [
  {
    id: '1',
    title: 'Big Buck Bunny',
    description: 'A large and lovable rabbit deals with three tiny bullies.',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/800px-Big_buck_bunny_poster_big.jpg',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: 596,
    category: 'Animation',
  },
  {
    id: '2',
    title: 'Sintel',
    description: 'A lonely young woman searches for a dragon.',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Sintel_poster.jpg/800px-Sintel_poster.jpg',
    videoUrl: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    duration: 888,
    category: 'Fantasy',
  },
  {
    id: '3',
    title: 'Tears of Steel',
    description: 'In a dystopian future, a group of warriors and scientists gather.',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Tears_of_Steel_poster.jpg/800px-Tears_of_Steel_poster.jpg',
    videoUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    duration: 734,
    category: 'Sci-Fi',
  },
  {
    id: '4',
    title: 'Cosmos Laundromat',
    description: 'On a desolate island, a suicidal sheep named Franck meets his fate.',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Cosmos_Laundromat_-_First_Cycle.jpg/800px-Cosmos_Laundromat_-_First_Cycle.jpg',
    videoUrl: 'https://bitdash-a.akamaihd.net/content/cosmo/hls/playlist.m3u8',
    duration: 652,
    category: 'Animation',
  },
  {
    id: '5',
    title: 'For Bigger Blazes',
    description: 'Experience the power of HDR video.',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: 15,
    category: 'Demo',
  },
  {
    id: '6',
    title: 'Elephant Dream',
    description: 'The world\'s first open movie, made entirely with open source graphics software.',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_proog.jpg/800px-Elephants_Dream_s5_proog.jpg',
    videoUrl: 'https://bitdash-a.akamaihd.net/content/elephant_dream/hls/playlist.m3u8',
    duration: 653,
    category: 'Sci-Fi',
  },
  {
    id: '7',
    title: 'For Bigger Joyrides',
    description: 'Action-packed fun with stunning visuals.',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration: 15,
    category: 'Action',
  },
  {
    id: '8',
    title: 'For Bigger Escapes',
    description: 'Escape into a world of wonder.',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: 15,
    category: 'Adventure',
  },
  {
    id: '9',
    title: 'For Bigger Fun',
    description: 'Fun times ahead.',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: 15,
    category: 'Comedy',
  },
  {
    id: '10',
    title: 'For Bigger Thrills',
    description: 'Thrilling moments await.',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerThrills.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerThrills.mp4',
    duration: 15,
    category: 'Thriller',
  },
  {
    id: '11',
    title: 'For Bigger Meltdowns',
    description: 'Emotional journey through challenges.',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration: 15,
    category: 'Drama',
  },
  {
    id: '12',
    title: 'Subaru Outback On Street And Dirt Road',
    description: 'Car driving through various terrains.',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirtRoad.jpg',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirtRoad.mp4',
    duration: 15,
    category: 'Automotive',
  },
];

export const CATEGORIES = [
  'All',
  'Animation',
  'Fantasy',
  'Sci-Fi',
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Thriller',
  'Demo',
  'Automotive',
];
