import * as React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { images } from '../constants';
import { fetchMoviesByDataset } from '../services/movieService';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorState from './ErrorState';
import AnimatedPressable from './AnimatedPressable';
import { Movie } from '../types';

const ITEM_WIDTH = 93;
const ITEM_MARGIN = 8;
const ITEM_FULL_WIDTH = ITEM_WIDTH + ITEM_MARGIN;

interface ScrollerItemProps {
  item: Movie;
}

const ScrollerItem: React.FC<ScrollerItemProps> = React.memo(({ item }) => {
  const navigation = useNavigation<any>();

  const renderItem =
    item.poster && images[item.poster] ? (
      <Image source={images[item.poster]} style={styles.image} />
    ) : (
      <Image source={images.developerPoster} style={styles.image} />
    );

  return (
    <AnimatedPressable
      accessible
      accessibilityLabel={`Movie ${item.title}`}
      animateOnMount
      onPress={() => {
        navigation.push('MovieDetails', { movie: item });
      }}
      style={styles.item}
    >
      {renderItem}
    </AnimatedPressable>
  );
});

ScrollerItem.displayName = 'ScrollerItem';

type DatasetName = 'trending' | 'recommended' | 'hits' | 'originals' | 'vault' | 'hdr';

interface MediaItemScrollerProps {
  dataset?: DatasetName;
}

const MediaItemScroller: React.FC<MediaItemScrollerProps> = ({ dataset = 'trending' }) => {
  const [data, setData] = React.useState<Movie[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const loadData = React.useCallback(() => {
    setIsLoading(true);
    setErrorMsg(null);
    fetchMoviesByDataset(dataset)
      .then((res) => {
        setData(Object.values(res));
        setIsLoading(false);
      })
      .catch((err: any) => {
        setErrorMsg(err.message || 'An error occurred');
        setIsLoading(false);
      });
  }, [dataset]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const keyExtractor = React.useCallback((item: Movie) => item.id.toString(), []);

  const renderItem = React.useCallback(
    ({ item }: { item: Movie }) => <ScrollerItem item={item} />,
    []
  );

  const getItemLayout = React.useCallback(
    (_data: any, index: number) => ({
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
  image: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%'
  }
});

export default MediaItemScroller;
