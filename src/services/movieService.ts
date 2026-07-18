import { delay } from './api';
import moviesDatabase from '../mockdata/moviesDatabase';
import { Movie, Category } from '../types';

type DatasetName = 'trending' | 'recommended' | 'hits' | 'originals' | 'vault' | 'hdr';

const datasets: Record<DatasetName, string[]> = {
  trending: [
    'ae',
    'tm',
    'ts',
    'cm',
    'tlk',
    'z',
    'a',
    'rajneeti',
    'go_goa_gone'
  ],
  recommended: [
    'anhe4',
    'aotce2',
    'batb',
    'cacw',
    'cm',
    'fz',
    'dil_toh_bachcha_hai_ji',
    'satyagraha'
  ],
  hits: [
    'swatsd',
    'tesbe5',
    'tfae7',
    'tpme1',
    'i',
    'b',
    'tees_maar_khan',
    'go_goa_gone'
  ],
  originals: ['roasws', 'sb', 'tlk', 'tlm', 'tm', 'tpme1', 'rajneeti'],
  vault: [
    'fz',
    'h',
    'i',
    'roasws',
    'sb',
    'swatsd',
    'satyagraha',
    'dil_toh_bachcha_hai_ji'
  ],
  hdr: ['tfae7', 'roasws', 'ae', 'cm']
};

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  await delay(400);
  const ids = datasets.trending;
  return ids
    .map((id) => moviesDatabase.find((m) => m.id === id))
    .filter((m): m is Movie => !!m);
};

export const fetchMovieDetails = async (id: string | number): Promise<Movie> => {
  await delay(400);
  const dbMovie = moviesDatabase.find((m) => m.id.toString() === id.toString());
  if (dbMovie) {
    return dbMovie as Movie;
  }
  throw new Error('Movie details not found');
};

export const fetchMoviesByDataset = async (dataset: DatasetName): Promise<Movie[]> => {
  await delay(400);
  const ids = datasets[dataset];
  if (ids) {
    return ids
      .map((id) => moviesDatabase.find((m) => m.id === id))
      .filter((m): m is Movie => !!m);
  }
  throw new Error(`Dataset ${dataset} not found`);
};

export const fetchMoviesByCategory = async (categoryName: string): Promise<Movie[]> => {
  await delay(400);
  const normalizedCategory = categoryName.toLowerCase().trim();

  if (normalizedCategory === 'movie' || normalizedCategory === 'movies') {
    return (moviesDatabase as Movie[]).filter(
      (m) => m.category !== 'Anime' && m.id !== 'tm' && m.id !== 'loki'
    );
  }

  if (normalizedCategory === 'tv shows' || normalizedCategory === 'tv') {
    return (moviesDatabase as Movie[]).filter((m) => m.id === 'tm' || m.id === 'loki');
  }

  if (normalizedCategory === 'anime') {
    return (moviesDatabase as Movie[]).filter((m) => m.category === 'Anime');
  }

  return (moviesDatabase as Movie[]).filter(
    (m) => m.category.toLowerCase() === normalizedCategory
  );
};

export const fetchCategories = async (): Promise<Category[]> => {
  await delay(300);
  return [
    { id: '1', name: 'Movies' },
    { id: '2', name: 'TV Shows' },
    { id: '3', name: 'Anime' },
    { id: '4', name: 'Marvel' },
    { id: '5', name: 'DC' }
  ];
};

export const fetchMoviesByMood = async (mood: string): Promise<Movie[]> => {
  await delay(300);
  const MOOD_GENRES: Record<string, string[]> = {
    '😊 Feel Good': [
      'Animation',
      'Family',
      'Adventure',
      'Nature',
      'Musical',
      'Feel Good'
    ],
    '😂 Comedy': ['Comedy'],
    '😱 Thriller': ['Thriller', 'Mystery', 'Crime'],
    '🚀 Sci-Fi': ['Sci-Fi', 'Space', 'Cyberpunk'],
    '❤️ Romance': ['Romance'],
    '⚔ Action': ['Action', 'Sports', 'Soccer', 'Adventure'],
    '🧙 Fantasy': ['Fantasy'],
    '👨👩👧 Family': ['Family', 'Animation']
  };
  const targetGenres = MOOD_GENRES[mood] || [];
  return (moviesDatabase as Movie[]).filter((movie) => {
    if (!movie.genres) return false;
    return movie.genres.some((genre) => targetGenres.includes(genre));
  });
};

export const fetchMovieByTitle = async (title: string): Promise<Movie> => {
  await delay(100);
  const normalizedTitle = title.toLowerCase().trim();
  const dbMovie = moviesDatabase.find(
    (m) => m.title.toLowerCase().trim() === normalizedTitle
  );
  if (dbMovie) {
    return dbMovie as Movie;
  }
  throw new Error('Movie not found by title');
};

export default {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchMoviesByDataset,
  fetchMoviesByCategory,
  fetchCategories,
  fetchMoviesByMood,
  fetchMovieByTitle
};
