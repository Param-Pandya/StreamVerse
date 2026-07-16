import * as React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import RecommendationCard from './RecommendationCard';

const ITEM_WIDTH = 93;
const ITEM_MARGIN = 8;
const ITEM_FULL_WIDTH = ITEM_WIDTH + ITEM_MARGIN;

const RecommendationRow = ({ movies }) => {
  const keyExtractor = React.useCallback((item) => item.id.toString(), []);

  const renderItem = React.useCallback(
    ({ item }) => <RecommendationCard movie={item} />,
    []
  );

  const getItemLayout = React.useCallback(
    (data, index) => ({
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

RecommendationRow.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      poster: PropTypes.string,
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

const styles = StyleSheet.create({
  containerFlatList: {
    paddingLeft: 16,
    paddingRight: 8
  }
});

export default React.memo(RecommendationRow);
