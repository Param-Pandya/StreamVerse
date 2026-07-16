import moviesDatabase from '../mockdata/moviesDatabase';

/**
 * Recommendation Service for StreamVerse
 * Intelligently recommends movies based on user interactions:
 * - Watchlist (profile watchlist)
 * - Continue Watching (profile watch progress)
 * - Recently Searched queries
 * - Categories & Genres
 */
export const getRecommendations = (
  watchlist = [],
  continueWatching = [],
  recentSearches = []
) => {
  // Set of IDs to exclude (already in watchlist or continue watching so recommendation is fresh)
  const excludeIds = new Set([
    ...watchlist.map((m) => m.id.toString()),
    ...continueWatching.map((cw) => cw.id.toString())
  ]);

  const hasSignals =
    watchlist.length > 0 ||
    continueWatching.length > 0 ||
    recentSearches.length > 0;

  if (!hasSignals) {
    // Default recommendations: return top-rated movies not excluded
    return moviesDatabase
      .filter((m) => !excludeIds.has(m.id.toString()))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }

  // Score mapping
  const scores = {};
  moviesDatabase.forEach((movie) => {
    scores[movie.id] = 0;
  });

  // Extract signals
  const searchedTerms = recentSearches.map((s) => s.toLowerCase().trim());
  const watchlistCategories = watchlist.map((m) => m.category).filter(Boolean);
  const watchlistGenres = watchlist.flatMap((m) => m.genres || []);

  // Resolve continueWatching to full movies
  const continueWatchingMovies = continueWatching
    .map((cw) =>
      moviesDatabase.find((m) => m.id.toString() === cw.id.toString())
    )
    .filter(Boolean);

  const watchedCategories = continueWatchingMovies
    .map((m) => m.category)
    .filter(Boolean);
  const watchedGenres = continueWatchingMovies.flatMap((m) => m.genres || []);

  // 1. Specific Rule-based matches:
  // "If the user watches Avengers: Recommend: Iron Man, Captain America, Thor, Loki, Black Panther"
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
        // High score boost to ensure they rank first
        scores[id] += 100 - idx;
      }
    });
  }

  // "If the user searches Batman: Recommend: Joker, The Dark Knight, The Batman, Justice League"
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

  // 2. Generalized scoring logic:
  moviesDatabase.forEach((movie) => {
    const movieTitleLower = movie.title.toLowerCase();
    const movieOverviewLower = movie.overview
      ? movie.overview.toLowerCase()
      : '';

    // A. Search terms matching
    searchedTerms.forEach((term) => {
      if (term.length > 2) {
        if (movieTitleLower.includes(term)) {
          scores[movie.id] += 30;
        } else if (movieOverviewLower.includes(term)) {
          scores[movie.id] += 10;
        }
      }
    });

    // B. Category overlap
    watchlistCategories.forEach((cat) => {
      if (movie.category === cat) scores[movie.id] += 15;
    });
    watchedCategories.forEach((cat) => {
      if (movie.category === cat) scores[movie.id] += 20;
    });

    // C. Genre overlap
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

    // D. Rating minor booster (for tie-breaking)
    scores[movie.id] += movie.rating * 0.5;
  });

  // 3. Return top movies sorting by score desc (excluding already watched/watchlist)
  return moviesDatabase
    .filter((m) => !excludeIds.has(m.id.toString()))
    .map((movie) => ({ movie, score: scores[movie.id] }))
    .filter((item) => item.score > 0.5) // filter out movies with no relevance
    .sort((a, b) => b.score - a.score)
    .map((item) => item.movie)
    .slice(0, 6);
};

export default {
  getRecommendations
};
