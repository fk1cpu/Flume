# Flume - Free Video Streaming App

A free, ad-free, no-login-required video streaming mobile app built with React Native and Expo.

## ⚠️ IMPORTANT DISCLAIMER

**EDUCATIONAL USE ONLY**

This application is designed as a technical demonstration of:
- React Native performance optimization
- API integration patterns (TMDB for metadata)
- Video streaming architecture

**LEGAL NOTICE:**
- This app uses TMDB API for movie/series metadata (posters, titles, descriptions)
- For video playback, it demonstrates the ARCHITECTURE using legally free content sources (Blender Foundation, etc.)
- Integrating with unauthorized third-party embed providers to stream copyrighted content may violate copyright laws in your jurisdiction
- Users are responsible for ensuring compliance with all applicable laws and terms of service
- The developers assume no liability for misuse of this codebase

## Features

- ✅ **No ads, no analytics, no tracking, no authentication**
- ✅ **Cold start → playable video in < 2s** on mid-range devices
- ✅ **Single codebase** for iOS + Android
- ✅ **Minimal dependencies** - no UI kits, no state libraries
- ✅ **Smooth 60fps scrolling** with virtualized lists
- ✅ **TikTok-style auto-play** - only visible video plays
- ✅ **Local progress tracking** - resume watching without an account
- ✅ **HLS/DASH support** with seamless buffering
- ✅ **Dark theme** matching premium streaming apps
- ✅ **TMDB Integration** for real movie/TV metadata

## Tech Stack

- React Native (latest stable) with Expo
- TypeScript
- `react-native-video` for playback (HLS/DASH)
- `react-native-video-cache` for seamless buffering
- `@react-navigation/native` for navigation
- `expo-image` for optimized image loading
- `@react-native-async-storage/async-storage` for local progress storage
- `axios` for API requests

## Project Structure

```
Flume/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── VideoCard.tsx      # Video thumbnail card
│   │   ├── VideoPlayer.tsx    # Full-screen video player
│   │   └── CategoryPill.tsx   # Category filter pill
│   ├── screens/          # Screen components
│   │   ├── HomeScreen.tsx       # Main feed with categories
│   │   ├── PlayerScreen.tsx     # Full-screen video player
│   │   └── LibraryScreen.tsx    # Continue watching list
│   ├── navigation/       # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── data/             # Mock data and types
│   │   └── mockData.ts
│   ├── utils/            # Helper functions
│   │   ├── theme.ts           # Design tokens
│   │   ├── helpers.ts         # Utility functions
│   │   └── storage.ts         # Local storage for progress
│   └── hooks/            # Custom hooks (if needed)
├── assets/               # Images and icons
├── App.tsx               # Entry point
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator

### Installation

```bash
cd Flume
npm install
```

### Running the App

#### iOS (macOS only)
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Web (for testing)
```bash
npm run web
```

### Using Expo Go

1. Install Expo Go on your iOS/Android device
2. Run `npm start` or `expo start`
3. Scan the QR code with Expo Go

## Configuration

### TMDB API Setup (Required for Real Metadata)

1. Get a free API key from [The Movie Database](https://www.themoviedb.org/settings/api)
2. Open `src/services/api.ts`
3. Replace `YOUR_TMDB_API_KEY_HERE` with your actual API key:

```typescript
const TMDB_API_KEY = 'your_actual_api_key_here';
```

### How It Works

The app uses a two-layer architecture:

1. **Metadata Layer (TMDB API)**: Fetches movie/TV show information including:
   - Titles, descriptions, ratings
   - Poster images
   - Categories and trending content

2. **Video Playback Layer**: 
   - **Demo Mode**: Uses legally free sample videos (Blender Foundation films)
   - **Production Mode**: Replace with your licensed content source

### Using a Real Video Source

To integrate with a legitimate video provider:

1. Obtain proper licensing for content distribution
2. Update `src/services/api.ts` to resolve streams from your authorized provider:

```typescript
// Example: Replace the videoUrl mapping in fetchTrendingMovies
const resolveStream = async (tmdbId: string) => {
  // Call YOUR licensed provider here
  const response = await axios.get(`https://your-licensed-api.com/stream/${tmdbId}`);
  return response.data.hlsUrl;
};
```

3. Expected data format:

```typescript
interface VideoItem {
  id: string;
  title: string;
  poster: string;        // URL to poster image
  videoUrl: string;      // HLS (.m3u8) or DASH URL
  duration: string;      // Duration display (e.g., "2h 15m")
  category: string;
  description: string;
}
```

### ⚠️ Legal Warning About Third-Party Embed Providers

Many tutorials suggest using free embed providers like VidSrc, 2Embed, etc. **Be aware:**

- These services often host copyrighted content without authorization
- Using them may violate copyright laws in your jurisdiction
- They can disappear or inject malware/ads at any time
- They are NOT suitable for production applications

**Recommended Legal Alternatives:**
- License content from distributors
- Use public domain/creative commons videos
- Partner with legitimate streaming APIs
- Create original content

## Performance Optimizations

This app implements several performance best practices:

1. **React.memo** on list items to prevent unnecessary re-renders
2. **Stable keys** using video IDs
3. **useCallback/useMemo** to avoid recreating functions/objects
4. **Virtualized lists** (FlatList) with optimized props
5. **Image optimization** with expo-image and fade-in transitions
6. **Video buffering** with pre-configured buffer settings
7. **TikTok-style playback** - only visible video player is active
8. **Local progress caching** for instant resume

## Design Tokens

The app uses a dark theme inspired by premium streaming services:

- Background: `#0E0E10`
- Surface: `#1A1A1E`
- Accent: `#3DDC84` (green)
- Text: `#F5F5F7`
- Secondary Text: `#9CA3AF`

## License

MIT License - Free to use for personal and commercial projects.

## Notes

- No user data is collected or transmitted
- All progress is stored locally on the device
- The app works completely offline after initial content load (for cached videos)
