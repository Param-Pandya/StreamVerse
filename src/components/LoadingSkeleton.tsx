import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../constants';

interface LoadingSkeletonProps {
  type?: 'card' | 'banner' | 'chip';
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'card',
  count = 3
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true
        })
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [fadeAnim]);

  if (type === 'banner') {
    return <Animated.View style={[styles.banner, { opacity: fadeAnim }]} />;
  }

  if (type === 'chip') {
    const chips = [
      'chip-1',
      'chip-2',
      'chip-3',
      'chip-4',
      'chip-5',
      'chip-6'
    ].slice(0, count);
    return (
      <View style={styles.row}>
        {chips.map((key) => (
          <Animated.View
            key={key}
            style={[styles.chip, { opacity: fadeAnim }]}
          />
        ))}
      </View>
    );
  }

  const cards = [
    'card-1',
    'card-2',
    'card-3',
    'card-4',
    'card-5',
    'card-6'
  ].slice(0, count);
  return (
    <View style={styles.row}>
      {cards.map((key) => (
        <Animated.View key={key} style={[styles.card, { opacity: fadeAnim }]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    alignSelf: 'center',
    backgroundColor: colors.profileEditBackground,
    borderRadius: 8,
    height: 200,
    marginTop: 10,
    width: '92%'
  },
  chip: {
    backgroundColor: colors.profileEditBackground,
    borderRadius: 20,
    height: 38,
    marginRight: 10,
    width: 90
  },
  card: {
    backgroundColor: colors.profileEditBackground,
    borderRadius: 6,
    height: 145,
    marginRight: 12,
    width: 100
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12
  }
});

export default LoadingSkeleton;
