import { delay } from './api';
import moviesDatabase from '../mockdata/moviesDatabase';
import { Movie } from '../types';

export const searchMovies = async (query: string, page: number = 1, limit: number = 9): Promise<Movie[]> => {
  await delay(300);
  if (!query || query.trim() === '') {
    return [];
  }
  const lowerQuery = query.toLowerCase().trim();
  const filtered = (moviesDatabase as Movie[]).filter((item) => {
    const titleMatch =
      item.title && item.title.toLowerCase().includes(lowerQuery);
    const categoryMatch =
      item.category && item.category.toLowerCase().includes(lowerQuery);
    const genreMatch =
      item.genres &&
      item.genres.some((genre) => genre.toLowerCase().includes(lowerQuery));
    return titleMatch || categoryMatch || genreMatch;
  });

  const start = (page - 1) * limit;
  const end = start + limit;
  return filtered.slice(start, end);
};

export const searchSuggestions = async (query: string): Promise<string[]> => {
  await delay(150);
  if (!query || query.trim() === '') {
    return [];
  }
  const lowerQuery = query.toLowerCase().trim();
  return (moviesDatabase as Movie[])
    .filter(
      (item) => item.title && item.title.toLowerCase().includes(lowerQuery)
    )
    .map((item) => item.title)
    .slice(0, 5);
};

export default {
  searchMovies,
  searchSuggestions
};
