import * as React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { colors, fonts } from '../constants';

export const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = React.useState(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(30)).current;

  const showToast = React.useCallback(
    (msg) => {
      setMessage(msg);
      fadeAnim.setValue(0);
      translateY.setValue(30);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true
        })
      ]).start(() => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 250,
              useNativeDriver: true
            }),
            Animated.timing(translateY, {
              toValue: 20,
              duration: 250,
              useNativeDriver: true
            })
          ]).start(() => {
            setMessage(null);
          });
        }, 2000);
      });
    },
    [fadeAnim, translateY]
  );

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && (
        <View pointerEvents="none" style={styles.outerContainer}>
          <Animated.View
            style={[
              styles.toastContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY }]
              }
            ]}
          >
            <Text style={styles.toastText}>{message}</Text>
          </Animated.View>
        </View>
      )}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    bottom: 50,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 9999
  },
  toastContainer: {
    backgroundColor: '#1b1822',
    borderColor: colors.categoryBorder,
    borderRadius: 8,
    borderWidth: 1.5,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  toastText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 14,
    textAlign: 'center'
  }
});
