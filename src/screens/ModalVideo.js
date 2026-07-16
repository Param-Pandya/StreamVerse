import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fonts, gStyle } from '../constants';
import { ProfileContext } from '../context/ProfileContext';

const ModalVideo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { saveWatchProgress } = React.useContext(ProfileContext);
  const { movie } = route.params || {};
  const movieId = movie?.id;

  React.useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );

    if (movieId) {
      saveWatchProgress(movieId, 2700, 75);
    }

    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
  }, [movieId, saveWatchProgress]);

  return (
    <View style={[gStyle.container, styles.container]}>
      <Text style={styles.text}>Streaming Video Player...</Text>
      <Text style={styles.subtext}>
        Simulating playback progress saved at 75%
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <Text style={styles.closeText}>Close Player</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.black,
    justifyContent: 'center'
  },
  text: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 22,
    marginBottom: 8
  },
  subtext: {
    color: colors.inactiveGrey,
    fontFamily: fonts.regular,
    fontSize: 14,
    marginBottom: 24
  },
  closeButton: {
    borderColor: colors.storageBlue,
    borderRadius: 6,
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  closeText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 14,
    textTransform: 'uppercase'
  }
});

export default ModalVideo;
