import * as React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { device, images } from '../constants';

// components
import ImageSlide from './ImageSlide';

// data
const slidesData = [
  { image: 'slideStarWarsMandalorian' },
  { image: 'slideAvengersEndgame' },
  { image: 'slideAvatar' },
  { image: 'slideCaptainMarvel' }
];

const SlideShow = () => {
  const flatListRef = React.useRef(null);
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
    (event) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(contentOffsetX / (itemWidth + spacing));
      if (index >= 0 && index < slidesData.length) {
        setCurrentIndex(index);
      }
    },
    [itemWidth, spacing]
  );

  const keyExtractor = React.useCallback((item) => item.image, []);

  const getItemLayout = React.useCallback(
    (data, index) => ({
      length: itemWidth + spacing,
      offset: (itemWidth + spacing) * index,
      index
    }),
    [itemWidth, spacing]
  );

  const renderItem = React.useCallback(
    ({ item: { image } }) => (
      <View
        style={[
          styles.slideContainer,
          { width: itemWidth, marginRight: spacing }
        ]}
      >
        <ImageSlide source={images[image]} width={itemWidth} />
      </View>
    ),
    [itemWidth, spacing]
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
