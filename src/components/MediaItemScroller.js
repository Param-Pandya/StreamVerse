import * as React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, images } from '../constants';
import fetchMoviesByDataset from '../services/api/movies';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorState from './ErrorState';
import AnimatedPressable from './AnimatedPressable';

const ITEM_WIDTH = 93;
const ITEM_MARGIN = 8;
const ITEM_FULL_WIDTH = ITEM_WIDTH + ITEM_MARGIN;

const ScrollerItem = React.memo(({ item }) => {
  const navigation = useNavigation();

  const renderItem = item.poster ? (
    <Image source={images[item.poster]} style={styles.image} />
  ) : (
    <View style={styles.placeholder} />
  );

  return (
    <AnimatedPressable
      accessible
      accessibilityLabel={`Movie ${item.title}`}
      animateOnMount
      onPress={() => {
        navigation.navigate('MovieDetails', { movie: item });
      }}
      style={styles.item}
    >
      {renderItem}
    </AnimatedPressable>
  );
});

ScrollerItem.displayName = 'ScrollerItem';

ScrollerItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    poster: PropTypes.string,
    title: PropTypes.string
  }).isRequired
};

const MediaItemScroller = ({ dataset }) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const loadData = React.useCallback(() => {
    setIsLoading(true);
    setErrorMsg(null);
    fetchMoviesByDataset(dataset)
      .then((res) => {
        setData(Object.values(res));
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setIsLoading(false);
      });
  }, [dataset]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const keyExtractor = React.useCallback(({ id }) => id.toString(), []);

  const renderItem = React.useCallback(
    ({ item }) => <ScrollerItem item={item} />,
    []
  );

  const getItemLayout = React.useCallback(
    (dataArray, index) => ({
      length: ITEM_FULL_WIDTH,
      offset: ITEM_FULL_WIDTH * index,
      index
    }),
    []
  );

  if (isLoading) {
    return <LoadingSkeleton type="card" count={4} />;
  }

  if (errorMsg) {
    return <ErrorState message={errorMsg} onRetry={loadData} />;
  }

  return (
    <FlatList
      contentContainerStyle={styles.containerFlatList}
      data={data}
      horizontal
      getItemLayout={getItemLayout}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={3}
      keyExtractor={keyExtractor}
      removeClippedSubviews
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  );
};

MediaItemScroller.defaultProps = {
  dataset: 'dumbData'
};

MediaItemScroller.propTypes = {
  dataset: PropTypes.string
};

const styles = StyleSheet.create({
  containerFlatList: {
    paddingLeft: 16,
    paddingRight: 8
  },
  item: {
    borderRadius: 6,
    height: 130,
    marginRight: ITEM_MARGIN,
    overflow: 'hidden',
    width: ITEM_WIDTH
  },
  placeholder: {
    backgroundColor: colors.infoGrey,
    height: '100%',
    width: '100%'
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
    width: '100%'
  }
});

export default MediaItemScroller;
