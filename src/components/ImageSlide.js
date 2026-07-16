import * as React from 'react';
import PropTypes from 'prop-types';
import { Animated, Image } from 'react-native';
import { device } from '../constants';

const ImageSlide = ({ source, width: imageWidth }) => {
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (source) {
      const { height, width } = Image.resolveAssetSource(source);
      const responsiveHeight = Math.round((imageWidth * height) / width);

      setDimensions({
        height: responsiveHeight,
        width: imageWidth
      });

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }).start();
    }
  }, [source, imageWidth, fadeAnim]);

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

ImageSlide.defaultProps = {
  source: null,
  width: device.width
};

ImageSlide.propTypes = {
  source: PropTypes.number,
  width: PropTypes.number
};

export default ImageSlide;
