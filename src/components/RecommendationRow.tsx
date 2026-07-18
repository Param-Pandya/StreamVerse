import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import RecommendationCard from './RecommendationCard';
import { Movie } from '../types';

const ITEM_WIDTH = 93;
const ITEM_MARGIN = 8;
const ITEM_FULL_WIDTH = ITEM_WIDTH + ITEM_MARGIN;

interface RecommendationRowProps {
  movies: Movie[];
}

const RecommendationRow: React.FC<RecommendationRowProps> = ({ movies }) => {
  const keyExtractor = React.useCallback((item: Movie) => item.id.toString(), []);

  const renderItem = React.useCallback(
    ({ item }: { item: Movie }) => <RecommendationCard movie={item} />,
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

  return (
    <FlatList
      contentContainerStyle={styles.containerFlatList}
      data={movies}
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
  }
});

export default React.memo(RecommendationRow);
