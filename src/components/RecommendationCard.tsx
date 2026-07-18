import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, images } from '../constants';
import AnimatedPressable from './AnimatedPressable';
import { Movie } from '../types';
import { Card } from 'react-native-paper';

const ITEM_WIDTH = 93;
const ITEM_MARGIN = 8;

interface RecommendationCardProps {
  movie: Movie;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ movie }) => {
  const navigation = useNavigation<any>();

  const handlePress = React.useCallback(() => {
    navigation.push('MovieDetails', { movie });
  }, [navigation, movie]);

  const renderImage = movie.poster && images[movie.poster] ? (
    <Card.Cover source={images[movie.poster]} style={styles.image} />
  ) : (
    <View style={styles.placeholder} />
  );

  return (
    <AnimatedPressable
      accessible
      accessibilityLabel={`Recommendation: ${movie.title}`}
      animateOnMount
      onPress={handlePress}
    >
      <Card style={styles.container}>
        {renderImage}
      </Card>
    </AnimatedPressable>
  );
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
