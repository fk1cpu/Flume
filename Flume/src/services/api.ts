/**
 * Flume - Video Streaming App
 * 
 * DISCLAIMER: EDUCATIONAL USE ONLY
 * --------------------------------
 * This application is designed as a technical demonstration of:
 * - React Native performance optimization
 * - API integration patterns (TMDB for metadata)
 * - Video streaming architecture
 * 
 * IMPORTANT LEGAL NOTICE:
 * - This app uses TMDB API for movie/series metadata (posters, titles, descriptions).
 * - For video playback, it demonstrates the ARCHITECTURE using legally free content sources.
 * - Integrating with unauthorized third-party embed providers to stream copyrighted content
 *   may violate copyright laws in your jurisdiction.
 * - Users are responsible for ensuring compliance with all applicable laws and terms of service.
 * - The developers assume no liability for misuse of this codebase.
 * 
 * To use with legal sources:
 * 1. Register for a TMDB API key at https://www.themoviedb.org/settings/api
 * 2. Replace MOCK_VIDEOS with your own legally licensed video URLs or authorized API endpoints.
 * 3. Do not integrate with pirate streaming APIs.
 */

import axios from 'axios';

const TMDB_API_KEY = 'YOUR_TMDB_API_KEY_HERE'; // Get free key from themoviedb.org
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Legal free video samples for demonstration (Blender Foundation, etc.)
export const LEGAL_VIDEO_SAMPLES = [
  {
    id: 'bbbbb',
    title: 'Big Buck Bunny',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', // HLS sample
    duration: '9:56',
    category: 'Animation',
    description: 'A large and lovable rabbit deals with three tiny bullies.'
  },
  {
    id: 'sintel',
    title: 'Sintel',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Sintel_poster.jpg/440px-Sintel_poster.jpg',
    videoUrl: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    duration: '14:48',
    category: 'Fantasy',
    description: 'A lonely young woman searches for a dragon.'
  },
  {
    id: 'tears',
    title: 'Tears of Steel',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Tears_of_Steel_poster.jpg/440px-Tears_of_Steel_poster.jpg',
    videoUrl: 'https://mnmediac.api.telefonica.com/mnmediac/79DCCB85-500E-4510-9F0C-A50C397C2313.ism/.m3u8',
    duration: '12:14',
    category: 'Sci-Fi',
    description: 'In a post-apocalyptic world, warriors fight against robots.'
  }
];

// Fetch trending movies from TMDB
export const fetchTrendingMovies = async () => {
  if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
    console.warn('TMDB API Key not configured. Using demo data.');
    return LEGAL_VIDEO_SAMPLES;
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US'
      }
    });

    return response.data.results.slice(0, 20).map(item => ({
      id: item.id.toString(),
      title: item.title,
      poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      // In a real app with proper licensing, you would resolve the stream here
      // For this demo, we map to legal samples or show a message
      videoUrl: LEGAL_VIDEO_SAMPLES[0].videoUrl, // Demo fallback
      duration: '~2h',
      category: 'Movie',
      description: item.overview
    }));
  } catch (error) {
    console.error('Error fetching TMDB data:', error);
    return LEGAL_VIDEO_SAMPLES;
  }
};

// Fetch TV shows
export const fetchTrendingTV = async () => {
  if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
    return LEGAL_VIDEO_SAMPLES;
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/tv/week`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US'
      }
    });

    return response.data.results.slice(0, 20).map(item => ({
      id: item.id.toString(),
      title: item.name,
      poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      videoUrl: LEGAL_VIDEO_SAMPLES[0].videoUrl, // Demo fallback
      duration: '~45m',
      category: 'TV Series',
      description: item.overview
    }));
  } catch (error) {
    console.error('Error fetching TV data:', error);
    return LEGAL_VIDEO_SAMPLES;
  }
};

// Search functionality
export const searchContent = async (query: string) => {
  if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY_HERE' || !query) {
    return LEGAL_VIDEO_SAMPLES.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        query: query
      }
    });

    return response.data.results
      .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
      .slice(0, 20)
      .map(item => ({
        id: item.id.toString(),
        title: item.title || item.name,
        poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
        videoUrl: LEGAL_VIDEO_SAMPLES[0].videoUrl,
        duration: item.media_type === 'movie' ? '~2h' : '~45m',
        category: item.media_type === 'movie' ? 'Movie' : 'TV Series',
        description: item.overview
      }));
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

/**
 * INTEGRATION GUIDE FOR DEVELOPERS:
 * 
 * To connect to a legitimate video source:
 * 1. Obtain proper licensing for content distribution.
 * 2. Replace LEGAL_VIDEO_SAMPLES mapping with your authorized CDN/API.
 * 3. If using a third-party embed provider, ensure they have distribution rights.
 * 
 * Example structure for a custom resolver:
 * 
 * const resolveStream = async (tmdbId: string) => {
 *   // Call YOUR licensed provider here
 *   // const response = await axios.get(`https://your-licensed-api.com/stream/${tmdbId}`);
 *   // return response.data.hlsUrl;
 *   throw new Error('Implement your licensed stream resolver here');
 * };
 */
