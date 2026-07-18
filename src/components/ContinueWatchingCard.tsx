import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, images } from '../constants';
import ProgressBar from './ProgressBar';
import AnimatedPressable from './AnimatedPressable';

interface ContinueWatchingItem {
  id: string | number;
  poster: string;
  title?: string;
  completionPercentage: number;
}

interface ContinueWatchingCardProps {
  item: ContinueWatchingItem;
  onPress: () => void;
}

const ContinueWatchingCard: React.FC<ContinueWatchingCardProps> = ({ item, onPress }) => (
  <AnimatedPressable
    accessible
    accessibilityLabel={`Resume ${item.title || 'Movie'}`}
    animateOnMount
    onPress={onPress}
    style={styles.container}
  >
    <View style={styles.imageContainer}>
      <Image source={images[item.poster] || images.developerPoster} style={styles.image} />
      <View style={styles.playOverlay}>
        <View style={styles.playBadge}>
          <Text style={styles.playBadgeText}>▶</Text>
        </View>
      </View>
    </View>

    <View style={styles.progressContainer}>
      <Text style={styles.percentText}>
        {item.completionPercentage}
        {'% Watched'}
      </Text>
      <ProgressBar progress={item.completionPercentage} />
    </View>
  </AnimatedPressable>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.profileBackground,
    borderRadius: 6,
    height: 190,
    marginRight: 12,
    overflow: 'hidden',
    width: 120
  },
  imageContainer: {
    flex: 1,
    position: 'relative'
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%'
  },
  playOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  playBadge: {
    alignItems: 'center',
    backgroundColor: colors.storageBlue,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36
  },
  playBadgeText: {
    color: colors.white,
    fontSize: 14,
    marginLeft: 2
  },
  progressContainer: {
    padding: 8
  },
  percentText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 10,
    marginBottom: 6
  }
});

export default ContinueWatchingCard;
