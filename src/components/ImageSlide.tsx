import * as React from 'react';
import { Animated, Image, ImageSourcePropType } from 'react-native';
import { device } from '../constants';

interface ImageSlideProps {
  source?: ImageSourcePropType | null;
  width?: number;
}

const ImageSlide: React.FC<ImageSlideProps> = ({ source = null, width = device.width }) => {
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (source) {
      const resolved = Image.resolveAssetSource(source);
      if (resolved) {
        const { height, width: resolvedWidth } = resolved;
        const responsiveHeight = Math.round((width * height) / resolvedWidth);

        setDimensions({
          height: responsiveHeight,
          width
        });

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true
        }).start();
      }
    }
  }, [source, width, fadeAnim]);

  if (!source) return null;

  return (
    <Animated.Image
      source={source}
      style={{
        height: dimensions.height,
        width: dimensions.width,
        opacity: fadeAnim
      }}
    />
  );
};

export default ImageSlide;
