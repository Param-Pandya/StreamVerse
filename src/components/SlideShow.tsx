import * as React from 'react';
import { FlatList, View, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { device, images } from '../constants';
import ImageSlide from './ImageSlide';
import AnimatedPressable from './AnimatedPressable';
import { fetchMovieDetails } from '../services/movieService';

interface SlideItem {
  image: string;
  movieId: string;
}

const slidesData: SlideItem[] = [
  { image: 'slideStarWarsMandalorian', movieId: 'tm' },
  { image: 'slideAvengersEndgame', movieId: 'ae' },
  { image: 'slideAvatar', movieId: 'a' },
  { image: 'slideCaptainMarvel', movieId: 'cm' }
];

const SlideShow: React.FC = () => {
  const navigation = useNavigation<any>();
  const flatListRef = React.useRef<FlatList<SlideItem>>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const itemWidth = device.width - 52;
  const spacing = 12;

  React.useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slidesData.length) {
        nextIndex = 0;
      }
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
        viewPosition: 0.5
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const onMomentumScrollEnd = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffsetX / (itemWidth + spacing));
      if (index >= 0 && index < slidesData.length) {
        setCurrentIndex(index);
      }
    },
    [itemWidth, spacing]
  );

  const keyExtractor = React.useCallback((item: SlideItem) => item.image, []);

  const getItemLayout = React.useCallback(
    (_data: any, index: number) => ({
      length: itemWidth + spacing,
      offset: (itemWidth + spacing) * index,
      index
    }),
    [itemWidth, spacing]
  );

  const renderItem = React.useCallback(
    ({ item: { image, movieId } }: { item: SlideItem }) => (
      <AnimatedPressable
        accessible
        accessibilityLabel={`Banner ${image}`}
        onPress={async () => {
          try {
            const movie = await fetchMovieDetails(movieId);
            if (movie) {
              navigation.navigate('MovieDetails', { movie });
            }
          } catch (e) {
            // ignore
          }
        }}
        style={[
          styles.slideContainer,
          { width: itemWidth, marginRight: spacing }
        ]}
      >
        <ImageSlide source={images[image]} width={itemWidth} />
      </AnimatedPressable>
    ),
    [itemWidth, spacing, navigation]
  );

  const contentContainerStyle = React.useMemo(
    () => ({
      paddingHorizontal: (device.width - itemWidth) / 2 - spacing / 2
    }),
    [itemWidth, spacing]
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slidesData}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + spacing}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={contentContainerStyle}
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={getItemLayout}
        initialNumToRender={2}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        renderItem={renderItem}
        windowSize={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
    width: device.width
  },
  slideContainer: {
    borderRadius: 8,
    overflow: 'hidden'
  }
});

export default SlideShow;
