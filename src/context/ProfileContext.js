import * as React from 'react';
import PropTypes from 'prop-types';
import storage from '../utils/storage';

export const ProfileContext = React.createContext();

const WATCHLIST_KEY = '@watchlist';
const PROGRESS_KEY = '@continue_watching';
const RECENT_SEARCHES_KEY = '@recent_searches';

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = React.useState([
    { id: '1', name: 'Param', avatar: 'stormtrooper', active: true },
    { id: '2', name: 'Guest', avatar: 'elsa', active: false }
  ]);

  const [watchlist, setWatchlist] = React.useState([]);
  const [continueWatching, setContinueWatching] = React.useState([]);
  const [recentSearches, setRecentSearches] = React.useState([]);

  const activeProfile = profiles.find((p) => p.active) || profiles[0];

  // Load Watchlist and Continue Watching on mount
  React.useEffect(() => {
    storage.getItem(WATCHLIST_KEY).then((dataStr) => {
      if (dataStr) {
        setWatchlist(JSON.parse(dataStr));
      }
    });
    storage.getItem(PROGRESS_KEY).then((dataStr) => {
      if (dataStr) {
        setContinueWatching(JSON.parse(dataStr));
      }
    });
    storage.getItem(RECENT_SEARCHES_KEY).then((dataStr) => {
      if (dataStr) {
        setRecentSearches(JSON.parse(dataStr));
      }
    });
  }, []);

  const selectProfile = (id) => {
    setProfiles(
      profiles.map((p) => ({
        ...p,
        active: p.id === id
      }))
    );
  };

  const updateProfileName = (id, newName) => {
    setProfiles(
      profiles.map((p) => (p.id === id ? { ...p, name: newName } : p))
    );
  };

  const addProfile = (name, forKids) => {
    const newId = (profiles.length + 1).toString();
    const avatars = ['stormtrooper', 'elsa', 'ironMan', 'yoda'];
    const randomAvatar = avatars[profiles.length % avatars.length];
    setProfiles([
      ...profiles,
      { id: newId, name, avatar: randomAvatar, active: false, forKids }
    ]);
  };

  // Watchlist Actions
  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.some(
        (item) => item.id.toString() === movie.id.toString()
      );
      let nextWatchlist;
      if (exists) {
        nextWatchlist = prev.filter(
          (item) => item.id.toString() !== movie.id.toString()
        );
      } else {
        nextWatchlist = [...prev, movie];
      }
      storage.setItem(WATCHLIST_KEY, JSON.stringify(nextWatchlist));
      return nextWatchlist;
    });
  };

  const checkInWatchlist = (movieId) => {
    return watchlist.some((item) => item.id.toString() === movieId.toString());
  };

  // Continue Watching Actions
  const saveWatchProgress = (
    movieId,
    watchedDuration,
    completionPercentage
  ) => {
    setContinueWatching((prev) => {
      const filtered = prev.filter(
        (item) => item.id.toString() !== movieId.toString()
      );
      const nextProgress = [
        {
          id: movieId,
          watchedDuration,
          completionPercentage,
          lastWatchedTimestamp: Date.now()
        },
        ...filtered
      ].slice(0, 5); // keep last 5 watched
      storage.setItem(PROGRESS_KEY, JSON.stringify(nextProgress));
      return nextProgress;
    });
  };

  // Search History Actions
  const addSearchTerm = React.useCallback((term) => {
    const trimmed = term.trim();
    if (trimmed === '') return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t !== trimmed);
      const nextRecent = [trimmed, ...filtered].slice(0, 5);
      storage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextRecent));
      return nextRecent;
    });
  }, []);

  const removeRecentSearch = React.useCallback((term) => {
    setRecentSearches((prev) => {
      const nextRecent = prev.filter((t) => t !== term);
      storage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextRecent));
      return nextRecent;
    });
  }, []);

  const clearAllRecent = React.useCallback(() => {
    setRecentSearches([]);
    storage.removeItem(RECENT_SEARCHES_KEY);
  }, []);

  const value = React.useMemo(
    () => ({
      profiles,
      activeProfile,
      selectProfile,
      updateProfileName,
      addProfile,
      watchlist,
      continueWatching,
      toggleWatchlist,
      checkInWatchlist,
      saveWatchProgress,
      recentSearches,
      addSearchTerm,
      removeRecentSearch,
      clearAllRecent
    }),
    [
      profiles,
      activeProfile,
      watchlist,
      continueWatching,
      recentSearches,
      addSearchTerm,
      removeRecentSearch,
      clearAllRecent
    ]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired
};
