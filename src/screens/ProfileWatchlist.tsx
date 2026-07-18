import * as React from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { colors, gStyle, images } from '../constants';
import { ProfileContext } from '../context/ProfileContext';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SvgBackground from '../components/icons/Svg.Background';
import SvgPlus from '../components/icons/Svg.Plus';
import { Movie } from '../types';

interface ProfileWatchlistProps {
  navigation: any;
}

const ProfileWatchlist: React.FC<ProfileWatchlistProps> = ({ navigation }) => {
  const context = React.useContext(ProfileContext);
  const watchlist = context ? context.watchlist : [];

  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setIsLoading(false);
    }, 700);
  }, []);

  const keyExtractor = React.useCallback((item: Movie) => item.id.toString(), []);

  const renderItem = React.useCallback(
    ({ item }: { item: Movie }) => (
      <TouchableOpacity
        accessible
        accessibilityLabel={`Movie ${item.title}`}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('MovieDetails', { movie: item });
        }}
        style={styles.cardContainer}
      >
        <Image source={images[item.poster] || images.developerPoster} style={styles.cardImage} />
      </TouchableOpacity>
    ),
    [navigation]
  );

  const getItemLayout = React.useCallback(
    (_data: any, index: number) => ({
      length: 155,
      offset: 155 * index,
      index
    }),
    []
  );

  let content;
  if (isLoading) {
    content = (
      <View style={styles.skeletonWrapper}>
        <LoadingSkeleton count={3} type="card" />
        <LoadingSkeleton count={3} type="card" />
      </View>
    );
  } else if (watchlist.length === 0) {
    content = (
      <View style={styles.emptyContainer}>
        <EmptyState
          description="Add movies and TV shows to your watchlist to keep track of what you want to watch."
          title="Your Watchlist is empty"
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('StackSearch')}
            style={styles.emptyIconContainer}
            accessible
            accessibilityLabel="Search movies to add to watchlist"
          >
            <SvgPlus size={48} />
          </TouchableOpacity>
        </EmptyState>
      </View>
    );
  } else {
    content = (
      <FlatList
        contentContainerStyle={styles.listContent}
        data={watchlist}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
        numColumns={3}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            tintColor={colors.white}
          />
        }
        initialNumToRender={9}
        maxToRenderPerBatch={9}
        removeClippedSubviews
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        windowSize={5}
      />
    );
  }

  return (
    <View style={gStyle.container}>
      <View style={gStyle.posAbsolute}>
        <SvgBackground />
      </View>

      <Header showBack title="Watchlist" />

      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 6,
    flex: 1 / 3,
    height: 145,
    margin: 6,
    overflow: 'hidden'
  },
  cardImage: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  emptyIconContainer: {
    alignItems: 'center',
    backgroundColor: colors.profileEditBackground,
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    width: 60
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 12
  },
  skeletonWrapper: {
    marginTop: 20
  }
});

export default ProfileWatchlist;
