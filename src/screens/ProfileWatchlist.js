import * as React from 'react';
import PropTypes from 'prop-types';
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

// components
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';

// icons
import SvgBackground from '../components/icons/Svg.Background';
import SvgPlus from '../components/icons/Svg.Plus';

const ProfileWatchlist = ({ navigation }) => {
  const { watchlist } = React.useContext(ProfileContext);

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

  const keyExtractor = React.useCallback((item) => item.id.toString(), []);

  const renderItem = React.useCallback(
    ({ item }) => (
      <TouchableOpacity
        accessible
        accessibilityLabel={`Movie ${item.title}`}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('MovieDetails', { movie: item });
        }}
        style={styles.cardContainer}
      >
        <Image source={images[item.poster]} style={styles.cardImage} />
      </TouchableOpacity>
    ),
    [navigation]
  );

  const getItemLayout = React.useCallback(
    (data, index) => ({
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
          <View style={styles.emptyIconContainer}>
            <SvgPlus size={48} />
          </View>
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
          // eslint-disable-next-line react/jsx-wrap-multilines
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

ProfileWatchlist.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
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
