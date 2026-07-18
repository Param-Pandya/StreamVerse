import * as React from 'react';
import storage from '../utils/storage';
import { Profile, Movie } from '../types';

export interface WatchProgress {
  id: string | number;
  watchedDuration: number;
  completionPercentage: number;
  lastWatchedTimestamp: number;
}

export interface ProfileContextType {
  profiles: Profile[];
  activeProfile: Profile;
  selectProfile: (id: string) => void;
  updateProfileName: (id: string, newName: string) => void;
  addProfile: (name: string, forKids: boolean) => void;
  watchlist: Movie[];
  continueWatching: WatchProgress[];
  toggleWatchlist: (movie: Movie) => void;
  checkInWatchlist: (movieId: string | number) => boolean;
  saveWatchProgress: (movieId: string | number, watchedDuration: number, completionPercentage: number) => void;
  recentSearches: string[];
  addSearchTerm: (term: string) => void;
  removeRecentSearch: (term: string) => void;
  clearAllRecent: () => void;
}

export const ProfileContext = React.createContext<ProfileContextType | undefined>(undefined);

const PROFILES_KEY = '@profiles';

interface ProfileProviderProps {
  children: React.ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profiles, setProfiles] = React.useState<Profile[]>([
    { id: '1', name: 'Param', avatar: 'stormtrooper', active: true },
    { id: '2', name: 'Guest', avatar: 'elsa', active: false }
  ]);

  const [watchlist, setWatchlist] = React.useState<Movie[]>([]);
  const [continueWatching, setContinueWatching] = React.useState<WatchProgress[]>([]);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);

  const activeProfile = React.useMemo<Profile>(() => {
    return profiles.find((p) => p.active) || profiles[0];
  }, [profiles]);

  // Load profiles on mount
  React.useEffect(() => {
    storage.getItem(PROFILES_KEY).then((dataStr) => {
      if (dataStr) {
        setProfiles(JSON.parse(dataStr));
      }
    });
  }, []);

  // Sync profiles to storage when they change
  React.useEffect(() => {
    if (profiles && profiles.length > 0) {
      storage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    }
  }, [profiles]);

  // Load Watchlist, Continue Watching, and Searches when activeProfile.id changes
  React.useEffect(() => {
    if (!activeProfile) return;
    const profileId = activeProfile.id;

    storage.getItem(`@watchlist_${profileId}`).then((dataStr) => {
      setWatchlist(dataStr ? JSON.parse(dataStr) : []);
    });
    storage.getItem(`@continue_watching_${profileId}`).then((dataStr) => {
      setContinueWatching(dataStr ? JSON.parse(dataStr) : []);
    });
    storage.getItem(`@recent_searches_${profileId}`).then((dataStr) => {
      setRecentSearches(dataStr ? JSON.parse(dataStr) : []);
    });
  }, [activeProfile?.id]);

  const selectProfile = React.useCallback((id: string) => {
    setProfiles((prev) =>
      prev.map((p) => ({
        ...p,
        active: p.id === id
      }))
    );
  }, []);

  const updateProfileName = React.useCallback((id: string, newName: string) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: newName } : p))
    );
  }, []);

  const addProfile = React.useCallback((name: string, forKids: boolean) => {
    setProfiles((prev) => {
      const newId = (prev.length + 1).toString();
      const avatars = ['stormtrooper', 'elsa', 'ironMan', 'yoda'];
      const randomAvatar = avatars[prev.length % avatars.length];
      return [
        ...prev,
        { id: newId, name, avatar: randomAvatar, active: false, forKids }
      ];
    });
  }, []);

  // Watchlist Actions
  const toggleWatchlist = React.useCallback(
    (movie: Movie) => {
      if (!activeProfile) return;
      const profileId = activeProfile.id;
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
        storage.setItem(
          `@watchlist_${profileId}`,
          JSON.stringify(nextWatchlist)
        );
        return nextWatchlist;
      });
    },
    [activeProfile?.id]
  );

  const checkInWatchlist = React.useCallback(
    (movieId: string | number) => {
      return watchlist.some(
        (item) => item.id.toString() === movieId.toString()
      );
    },
    [watchlist]
  );

  // Continue Watching Actions
  const saveWatchProgress = React.useCallback(
    (movieId: string | number, watchedDuration: number, completionPercentage: number) => {
      if (!activeProfile) return;
      const profileId = activeProfile.id;
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
        storage.setItem(
          `@continue_watching_${profileId}`,
          JSON.stringify(nextProgress)
        );
        return nextProgress;
      });
    },
    [activeProfile?.id]
  );

  // Search History Actions
  const addSearchTerm = React.useCallback(
    (term: string) => {
      const trimmed = term.trim();
      if (trimmed === '' || !activeProfile) return;
      const profileId = activeProfile.id;

      setRecentSearches((prev) => {
        const filtered = prev.filter((t) => t !== trimmed);
        const nextRecent = [trimmed, ...filtered].slice(0, 5);
        storage.setItem(
          `@recent_searches_${profileId}`,
          JSON.stringify(nextRecent)
        );
        return nextRecent;
      });
    },
    [activeProfile?.id]
  );

  const removeRecentSearch = React.useCallback(
    (term: string) => {
      if (!activeProfile) return;
      const profileId = activeProfile.id;
      setRecentSearches((prev) => {
        const nextRecent = prev.filter((t) => t !== term);
        storage.setItem(
          `@recent_searches_${profileId}`,
          JSON.stringify(nextRecent)
        );
        return nextRecent;
      });
    },
    [activeProfile?.id]
  );

  const clearAllRecent = React.useCallback(() => {
    if (!activeProfile) return;
    const profileId = activeProfile.id;
    setRecentSearches([]);
    storage.removeItem(`@recent_searches_${profileId}`);
  }, [activeProfile?.id]);

  const value = React.useMemo<ProfileContextType>(
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
    ]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
