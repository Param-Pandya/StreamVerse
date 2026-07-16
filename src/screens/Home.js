import * as React from 'react';
import PropTypes from 'prop-types';
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
import moviesDatabase from '../mockdata/moviesDatabase';

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
import RecommendationRow from '../components/RecommendationRow';
import MoodSelector from '../components/MoodSelector';

const MOOD_GENRES = {
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

const findMovieById = (id) => {
  return moviesDatabase.find((item) => item.id.toString() === id.toString());
};

const Home = ({ navigation }) => {
  const { continueWatching, watchlist, recentSearches } =
    React.useContext(ProfileContext);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedMood, setSelectedMood] = React.useState(null);

  const recommendedMovies = React.useMemo(() => {
    return getRecommendations(watchlist, continueWatching, recentSearches);
  }, [watchlist, continueWatching, recentSearches]);

  const handleSelectMood = React.useCallback((mood) => {
    setSelectedMood((prev) => (prev === mood ? null : mood));
  }, []);

  const filteredMovies = React.useMemo(() => {
    if (!selectedMood) return [];
    const targetGenres = MOOD_GENRES[selectedMood] || [];
    return moviesDatabase.filter((movie) => {
      if (!movie.genres) return false;
      return movie.genres.some((genre) => targetGenres.includes(genre));
    });
  }, [selectedMood]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const enrichedContinueWatching = React.useMemo(() => {
    return continueWatching
      .map((progress) => {
        const movieDetails = findMovieById(progress.id);
        return {
          ...progress,
          ...movieDetails
        };
      })
      .filter((item) => item.image);
  }, [continueWatching]);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setIsLoading(false);
    }, 700);
  }, []);

  const renderContinueItem = React.useCallback(
    ({ item }) => (
      <ContinueWatchingCard
        item={item}
        onPress={() => {
          navigation.navigate('MovieDetails', { movie: item });
        }}
      />
    ),
    [navigation]
  );

  const keyExtractor = React.useCallback((item) => item.id.toString(), []);

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
          // eslint-disable-next-line react/jsx-wrap-multilines
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

        <Categories />

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
            {filteredMovies.length > 0 ? (
              <RecommendationRow movies={filteredMovies} />
            ) : (
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

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
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
