import * as React from 'react';
import { Animated, Pressable } from 'react-native';
import PropTypes from 'prop-types';

const AnimatedPressable = ({
  children,
  onPress,
  style,
  animateOnMount,
  accessible,
  accessibilityLabel
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const fadeAnim = React.useRef(
    new Animated.Value(animateOnMount ? 0 : 1)
  ).current;
  const translateY = React.useRef(
    new Animated.Value(animateOnMount ? 15 : 0)
  ).current;

  React.useEffect(() => {
    if (animateOnMount) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [animateOnMount, fadeAnim, translateY]);

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  return (
    <Pressable
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale }, { translateY }]
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

AnimatedPressable.defaultProps = {
  animateOnMount: false,
  style: {},
  accessible: true,
  accessibilityLabel: undefined
};

AnimatedPressable.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  animateOnMount: PropTypes.bool,
  accessible: PropTypes.bool,
  accessibilityLabel: PropTypes.string
};

export default AnimatedPressable;
