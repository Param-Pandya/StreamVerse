import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { colors, device, fonts, gStyle, images } from '../constants';
import { ProfileContext } from '../context/ProfileContext';
import { ToastContext } from '../context/ToastContext';
import MediaItemScroller from '../components/MediaItemScroller';
import ErrorState from '../components/ErrorState';
import AnimatedPressable from '../components/AnimatedPressable';

const MovieDetails = ({ route, navigation }) => {
  const { movie } = route.params || {};
  const { toggleWatchlist, checkInWatchlist, continueWatching } =
    React.useContext(ProfileContext);
  const showToast = React.useContext(ToastContext);

  if (!movie) {
    return (
      <View style={[gStyle.container, styles.centerView]}>
        <ErrorState
          message="Failed to load movie details"
          onRetry={() => navigation.goBack()}
        />
      </View>
    );
  }

  const isMovieInWatchlist = checkInWatchlist(movie.id);
  const progressItem = continueWatching.find(
    (p) => p.id.toString() === movie.id.toString()
  );
  const playLabel = progressItem
    ? `Resume (${progressItem.completionPercentage}%)`
    : 'Play Now';

  const handleWatchlistToggle = () => {
    toggleWatchlist(movie);
    if (isMovieInWatchlist) {
      showToast(`${movie.title} removed from Watchlist`);
    } else {
      showToast(`${movie.title} added to Watchlist`);
    }
  };

  return (
    <View style={gStyle.container}>
      {/* Header Overlays */}
      <AnimatedPressable
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backArrow}>←</Text>
      </AnimatedPressable>

      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Backdrop Banner */}
        <View style={styles.backdropContainer}>
          <Image source={images[movie.backdrop]} style={styles.backdropImage} />
          <View style={styles.backdropOverlay} />
        </View>

        {/* Info Row: Poster & Metadata */}
        <View style={styles.infoContainer}>
          <Image source={images[movie.poster]} style={styles.posterImage} />
          <View style={styles.metaContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.metaText}>
              {movie.releaseYear}
              {' • '}
              {movie.runtime}
              {' • ★ '}
              {movie.rating}
            </Text>
            <View style={styles.genresContainer}>
              {movie.genres.map((genre) => (
                <View key={genre} style={styles.genreChip}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Action Controls */}
        <View style={styles.actionsContainer}>
          <AnimatedPressable
            onPress={() => {
              navigation.navigate('ModalVideo', { movie });
            }}
            style={styles.playButton}
          >
            <Text style={styles.playButtonText}>{playLabel}</Text>
          </AnimatedPressable>

          <AnimatedPressable
            onPress={handleWatchlistToggle}
            style={[
              styles.watchlistButton,
              isMovieInWatchlist && styles.watchlistButtonActive
            ]}
          >
            <Text style={styles.watchlistButtonText}>
              {isMovieInWatchlist ? '✓ Watchlisted' : '+ Add to Watchlist'}
            </Text>
          </AnimatedPressable>
        </View>

        {/* Overview Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionHeading}>Overview</Text>
          <Text style={styles.descriptionText}>{movie.overview}</Text>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsContainer}>
          <Text style={styles.sectionHeading}>More Like This</Text>
          <MediaItemScroller dataset="recommended" />
        </View>

        <View style={gStyle.spacer24} />
      </ScrollView>
    </View>
  );
};

MovieDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      movie: PropTypes.object.isRequired
    })
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 16
  },
  backArrow: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 22
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: colors.black50,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    left: 16,
    position: 'absolute',
    top: device.iPhoneNotch ? 54 : 30,
    width: 40,
    zIndex: 10
  },
  backdropContainer: {
    height: 220,
    width: '100%'
  },
  backdropImage: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%'
  },
  backdropOverlay: {
    ...gStyle.posAbsolute,
    backgroundColor: 'rgba(11, 9, 15, 0.6)'
  },
  centerView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  descriptionContainer: {
    marginTop: 24,
    paddingHorizontal: 16
  },
  descriptionText: {
    color: colors.heading,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8
  },
  genreChip: {
    backgroundColor: colors.profileEditBackground,
    borderRadius: 4,
    marginRight: 6,
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  genreText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 11
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: -40,
    paddingHorizontal: 16
  },
  metaContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 16,
    paddingBottom: 4
  },
  metaText: {
    color: colors.inactiveGrey,
    fontFamily: fonts.medium,
    fontSize: 13,
    marginTop: 6
  },
  playButton: {
    alignItems: 'center',
    backgroundColor: colors.storageBlue,
    borderRadius: 6,
    flex: 1,
    height: 46,
    justifyContent: 'center',
    marginRight: 10
  },
  playButtonText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 15
  },
  posterImage: {
    borderColor: colors.categoryBorder,
    borderRadius: 6,
    borderWidth: 1.5,
    height: 135,
    resizeMode: 'cover',
    width: 90
  },
  recommendationsContainer: {
    marginTop: 24
  },
  scrollContainer: {
    paddingBottom: 40
  },
  sectionHeading: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 16
  },
  title: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 20
  },
  watchlistButton: {
    alignItems: 'center',
    borderColor: colors.categoryBorder,
    borderRadius: 6,
    borderWidth: 1.5,
    flex: 1,
    height: 46,
    justifyContent: 'center'
  },
  watchlistButtonActive: {
    backgroundColor: colors.profileEditBackground,
    borderColor: colors.white
  },
  watchlistButtonText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 14
  }
});

export default MovieDetails;
