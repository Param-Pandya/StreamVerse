import * as React from 'react';
import { Animated, Pressable, StyleProp, ViewStyle } from 'react-native';

interface AnimatedPressableProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  animateOnMount?: boolean;
  accessible?: boolean;
  accessibilityLabel?: string;
  className?: string;
}

const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  children,
  onPress,
  style = {},
  animateOnMount = false,
  accessible = true,
  accessibilityLabel,
  className
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
      className={className}
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

export default AnimatedPressable;
