import * as React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, images } from '../constants';
import AnimatedPressable from './AnimatedPressable';

const ITEM_WIDTH = 93;
const ITEM_MARGIN = 8;

const RecommendationCard = ({ movie }) => {
  const navigation = useNavigation();

  const handlePress = React.useCallback(() => {
    navigation.navigate('MovieDetails', { movie });
  }, [navigation, movie]);

  const renderImage = movie.poster ? (
    <Image source={images[movie.poster]} style={styles.image} />
  ) : (
    <View style={styles.placeholder} />
  );

  return (
    <AnimatedPressable
      accessible
      accessibilityLabel={`Recommendation: ${movie.title}`}
      animateOnMount
      onPress={handlePress}
      style={styles.container}
    >
      {renderImage}
    </AnimatedPressable>
  );
};

RecommendationCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    poster: PropTypes.string,
    title: PropTypes.string.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.categoryBorder,
    borderRadius: 6,
    borderWidth: 1,
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
    resizeMode: 'cover',
    width: '100%'
  }
});

export default React.memo(RecommendationCard);
