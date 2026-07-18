import * as React from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { colors, device, fonts, gStyle } from '../constants';
import { ProfileContext } from '../context/ProfileContext';

// components
import Categories from '../components/Categories';
import MediaItemScroller from '../components/MediaItemScroller';
import SlideShow from '../components/SlideShow';
import ContinueWatchingCard from '../components/ContinueWatchingCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

// icons
import SvgBackground from '../components/icons/Svg.Background';
import SvgBrandLogo from '../components/icons/Svg.BrandLogo';

// services and components
import { getRecommendations } from '../services/recommendationService';
import {
  fetchMovieDetails,
  fetchMoviesByCategory,
  fetchMoviesByMood
} from '../services/movieService';
import RecommendationRow from '../components/RecommendationRow';
import MoodSelector from '../components/MoodSelector';
import { Movie } from '../types';

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const context = React.useContext(ProfileContext);
  if (!context) return null;
  const { continueWatching, watchlist, recentSearches } = context;

  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedMood, setSelectedMood] = React.useState<string | null>(null);
  const [moodMovies, setMoodMovies] = React.useState<Movie[]>([]);
  const [isLoadingMood, setIsLoadingMood] = React.useState(false);

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [categoryMovies, setCategoryMovies] = React.useState<Movie[]>([]);
  const [isLoadingCategory, setIsLoadingCategory] = React.useState(false);

  const [enrichedContinueWatching, setEnrichedContinueWatching] =
    React.useState<any[]>([]);

  const recommendedMovies = React.useMemo(() => {
    return getRecommendations(watchlist, continueWatching, recentSearches);
  }, [watchlist, continueWatching, recentSearches]);

  const handleSelectMood = React.useCallback(
    async (mood: string) => {
      if (selectedMood === mood) {
        setSelectedMood(null);
        setMoodMovies([]);
      } else {
        setSelectedMood(mood);
        setIsLoadingMood(true);
        try {
          const movies = await fetchMoviesByMood(mood);
          setMoodMovies(movies);
        } catch (err) {
          setMoodMovies([]);
        } finally {
          setIsLoadingMood(false);
        }
      }
    },
    [selectedMood]
  );

  const handleSelectCategory = React.useCallback(
    async (category: string) => {
      if (selectedCategory === category) {
        setSelectedCategory(null);
        setCategoryMovies([]);
      } else {
        setSelectedCategory(category);
        setIsLoadingCategory(true);
        try {
          const movies = await fetchMoviesByCategory(category);
          setCategoryMovies(movies);
        } catch (err) {
          setCategoryMovies([]);
        } finally {
          setIsLoadingCategory(false);
        }
      }
    },
    [selectedCategory]
  );

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    async function enrich() {
      try {
        const promises = continueWatching.map(async (progress) => {
          try {
            const details = await fetchMovieDetails(progress.id);
            return { ...progress, ...details };
          } catch (e) {
            return null;
          }
        });
        const results = await Promise.all(promises);
        if (isMounted) {
          setEnrichedContinueWatching(
            results.filter((item) => item && item.poster)
          );
        }
      } catch (err) {
        // ignore
      }
    }
    if (continueWatching && continueWatching.length > 0) {
      enrich();
    } else {
      setEnrichedContinueWatching([]);
    }
    return () => {
      isMounted = false;
    };
  }, [continueWatching]);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setIsLoading(true);
    setSelectedCategory(null);
    setCategoryMovies([]);
    setSelectedMood(null);
    setMoodMovies([]);
    setTimeout(() => {
      setIsRefreshing(false);
      setIsLoading(false);
    }, 700);
  }, []);

  const renderContinueItem = React.useCallback(
    ({ item }: { item: any }) => (
      <ContinueWatchingCard
        item={item}
        onPress={() => {
          navigation.navigate('MovieDetails', { movie: item });
        }}
      />
    ),
    [navigation]
  );

  const keyExtractor = React.useCallback((item: any) => item.id.toString(), []);

  if (isLoading) {
    return (
      <View style={gStyle.container}>
        <View style={gStyle.posAbsolute}>
          <SvgBackground />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerHeader}>
            <SvgBrandLogo />
          </View>
          <LoadingSkeleton type="banner" />
          <LoadingSkeleton type="chip" count={4} />
          <Text style={gStyle.heading}>Trending Now</Text>
          <LoadingSkeleton type="card" count={4} />
          <Text style={gStyle.heading}>🤖 Recommended For You</Text>
          <LoadingSkeleton type="card" count={4} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={gStyle.container}>
      <View style={gStyle.posAbsolute}>
        <SvgBackground />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            tintColor={colors.white}
          />
        }
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerHeader}>
          <SvgBrandLogo />
        </View>

        <SlideShow />

        <Categories
          activeCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {selectedCategory && (
          <React.Fragment>
            <Text style={styles.filteredHeading}>
              {`Category: ${selectedCategory}`}
            </Text>
            {isLoadingCategory && <LoadingSkeleton type="card" count={3} />}
            {!isLoadingCategory && categoryMovies.length > 0 && (
              <RecommendationRow movies={categoryMovies} />
            )}
            {!isLoadingCategory && categoryMovies.length === 0 && (
              <Text style={styles.emptyFilteredText}>
                No content found in this category.
              </Text>
            )}
          </React.Fragment>
        )}

        {enrichedContinueWatching.length > 0 && (
          <View style={styles.continueWatchingSection}>
            <Text style={styles.continueWatchingTitle}>Continue Watching</Text>
            <FlatList
              contentContainerStyle={styles.continueFlatList}
              data={enrichedContinueWatching}
              horizontal
              initialNumToRender={3}
              keyExtractor={keyExtractor}
              maxToRenderPerBatch={3}
              removeClippedSubviews
              renderItem={renderContinueItem}
              showsHorizontalScrollIndicator={false}
              windowSize={3}
            />
          </View>
        )}

        <Text style={gStyle.heading}>Trending Now</Text>
        <MediaItemScroller dataset="trending" />

        {recommendedMovies.length > 0 && (
          <React.Fragment>
            <Text style={gStyle.heading}>🤖 Recommended For You</Text>
            <RecommendationRow movies={recommendedMovies} />
          </React.Fragment>
        )}

        <Text style={gStyle.heading}>🎭 What are you in the mood for?</Text>
        <MoodSelector
          selectedMood={selectedMood}
          onSelectMood={handleSelectMood}
        />

        {selectedMood && (
          <React.Fragment>
            <Text style={styles.filteredHeading}>{`${selectedMood} Hits`}</Text>
            {isLoadingMood && <LoadingSkeleton type="card" count={3} />}
            {!isLoadingMood && moodMovies.length > 0 && (
              <RecommendationRow movies={moodMovies} />
            )}
            {!isLoadingMood && moodMovies.length === 0 && (
              <Text style={styles.emptyFilteredText}>
                No movies found matching this mood.
              </Text>
            )}
          </React.Fragment>
        )}

        <Text style={gStyle.heading}>Blockbuster Movies</Text>
        <MediaItemScroller dataset="hits" />

        <Text style={gStyle.heading}>Popular TV Shows</Text>
        <MediaItemScroller dataset="vault" />

        <Text style={gStyle.heading}>StreamVerse Originals</Text>
        <MediaItemScroller dataset="originals" />

        <Text style={gStyle.heading}>Top Sports & Action</Text>
        <MediaItemScroller dataset="hdr" />

        <View style={gStyle.spacer24} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    alignItems: 'center',
    marginBottom: 8,
    paddingTop: device.iPhoneNotch ? 36 : 6
  },
  continueWatchingSection: {
    marginBottom: 20
  },
  continueWatchingTitle: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 18,
    marginBottom: 12,
    marginLeft: 16
  },
  continueFlatList: {
    paddingLeft: 16,
    paddingRight: 8
  },
  filteredHeading: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 18,
    marginBottom: 12,
    marginLeft: 16,
    marginTop: 20
  },
  emptyFilteredText: {
    color: colors.inactiveGrey,
    fontFamily: fonts.regular,
    fontSize: 14,
    marginLeft: 16,
    marginVertical: 10
  }
});

export default Home;
