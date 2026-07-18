import moviesDatabase from '../mockdata/moviesDatabase';
import { Movie } from '../types';

export interface WatchProgress {
  id: string | number;
  position?: number;
  duration?: number;
}

export const getRecommendations = (
  watchlist: Movie[] = [],
  continueWatching: WatchProgress[] = [],
  recentSearches: string[] = []
): Movie[] => {
  const excludeIds = new Set<string>([
    ...watchlist.map((m) => m.id.toString()),
    ...continueWatching.map((cw) => cw.id.toString())
  ]);

  const hasSignals =
    watchlist.length > 0 ||
    continueWatching.length > 0 ||
    recentSearches.length > 0;

  if (!hasSignals) {
    return (moviesDatabase as Movie[])
      .filter((m) => !excludeIds.has(m.id.toString()))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }

  const scores: Record<string | number, number> = {};
  moviesDatabase.forEach((movie) => {
    scores[movie.id] = 0;
  });

  const searchedTerms = recentSearches.map((s) => s.toLowerCase().trim());
  const watchlistCategories = watchlist.map((m) => m.category).filter(Boolean);
  const watchlistGenres = watchlist.flatMap((m) => m.genres || []);

  const continueWatchingMovies = continueWatching
    .map((cw) =>
      moviesDatabase.find((m) => m.id.toString() === cw.id.toString())
    )
    .filter((m): m is Movie => !!m);

  const watchedCategories = continueWatchingMovies
    .map((m) => m.category)
    .filter(Boolean);
  const watchedGenres = continueWatchingMovies.flatMap((m) => m.genres || []);

  const watchedOrInWatchlistAvengers = [
    ...watchlist,
    ...continueWatchingMovies
  ].some((m) => m.title.toLowerCase().includes('avengers'));
  const searchedAvengers = searchedTerms.some((term) =>
    term.includes('avengers')
  );

  if (watchedOrInWatchlistAvengers || searchedAvengers) {
    const avengersRecs = ['i', 'cap_america', 'thor', 'loki', 'b'];
    avengersRecs.forEach((id, idx) => {
      if (scores[id] !== undefined) {
        scores[id] += 100 - idx;
      }
    });
  }

  const searchedBatman = searchedTerms.some((term) => term.includes('batman'));
  const watchedOrInWatchlistBatman = [
    ...watchlist,
    ...continueWatchingMovies
  ].some(
    (m) =>
      m.title.toLowerCase().includes('batman') ||
      m.title.toLowerCase().includes('dark knight')
  );

  if (searchedBatman || watchedOrInWatchlistBatman) {
    const batmanRecs = ['joker', 'h', 'the_batman', 'justice_league'];
    batmanRecs.forEach((id, idx) => {
      if (scores[id] !== undefined) {
        scores[id] += 100 - idx;
      }
    });
  }

  (moviesDatabase as Movie[]).forEach((movie) => {
    const movieTitleLower = movie.title.toLowerCase();
    const movieOverviewLower = movie.overview
      ? movie.overview.toLowerCase()
      : '';

    searchedTerms.forEach((term) => {
      if (term.length > 2) {
        if (movieTitleLower.includes(term)) {
          scores[movie.id] += 30;
        } else if (movieOverviewLower.includes(term)) {
          scores[movie.id] += 10;
        }
      }
    });

    watchlistCategories.forEach((cat) => {
      if (movie.category === cat) scores[movie.id] += 15;
    });
    watchedCategories.forEach((cat) => {
      if (movie.category === cat) scores[movie.id] += 20;
    });

    if (movie.genres) {
      movie.genres.forEach((genre) => {
        const watchlistGenreCount = watchlistGenres.filter(
          (g) => g === genre
        ).length;
        scores[movie.id] += watchlistGenreCount * 5;

        const watchedGenreCount = watchedGenres.filter(
          (g) => g === genre
        ).length;
        scores[movie.id] += watchedGenreCount * 8;
      });
    }

    scores[movie.id] += movie.rating * 0.5;
  });

  return (moviesDatabase as Movie[])
    .filter((m) => !excludeIds.has(m.id.toString()))
    .map((movie) => ({ movie, score: scores[movie.id] }))
    .filter((item) => item.score > 0.5)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.movie)
    .slice(0, 6);
};

export default {
  getRecommendations
};
