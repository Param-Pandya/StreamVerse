import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation, useRoute } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { WebView } from 'react-native-webview';
import { colors, fonts, gStyle } from '../constants';
import { ProfileContext } from '../context/ProfileContext';

const ModalVideo: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const context = React.useContext(ProfileContext);
  const saveWatchProgress = context ? context.saveWatchProgress : () => {};

  const { movie } = route.params || {};
  const movieId = movie?.id;
  const videoId = movie?.youtubeTrailerId;

  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const [dimensions, setDimensions] = React.useState(() => {
    const { width, height } = Dimensions.get('window');
    return {
      width: Math.max(width, height),
      height: Math.min(width, height)
    };
  });

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: Math.max(window.width, window.height),
        height: Math.min(window.width, window.height)
      });
    });
    return () => subscription?.remove();
  }, []);

  React.useEffect(() => {
    async function lockLandscape() {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
        );
      } catch (e) {
        // ignore orientation errors
      }
    }

    lockLandscape();

    if (movieId) {
      saveWatchProgress(movieId, 2700, 75);
    }

    return () => {
      async function restorePortrait() {
        try {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
          );
        } catch (e) {
          // ignore orientation errors
        }
      }
      restorePortrait();
    };
  }, [movieId, saveWatchProgress]);

  const onStateChange = React.useCallback((state: string) => {
    if (state === 'ended') {
      setIsPlaying(false);
    }
  }, []);

  const handleWebViewError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <View style={[gStyle.container, styles.container]}>
      {videoId && !error ? (
        <View style={{ width: dimensions.width, height: dimensions.height }}>
          <YoutubePlayer
            key={videoId}
            height={dimensions.height}
            width={dimensions.width}
            play={isPlaying}
            videoId={videoId}
            onChangeState={onStateChange}
            onReady={() => setIsLoading(false)}
            onError={() => setError(true)}
          />
        </View>
      ) : (
        <View style={{ width: dimensions.width, height: dimensions.height }}>
          <WebView
            style={styles.webview}
            javaScriptEnabled
            domStorageEnabled
            allowsFullscreenVideo
            mediaPlaybackRequiresUserAction={false}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onError={handleWebViewError}
            source={{
              html: `
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                    <style>
                      body {
                        margin: 0;
                        background-color: black;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        width: 100vw;
                        overflow: hidden;
                      }
                      video {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                      }
                    </style>
                  </head>
                  <body>
                    <video autoplay controls playsinline>
                      <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
                      Your browser does not support the video tag.
                    </video>
                  </body>
                </html>
              `
            }}
          />
        </View>
      )}

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.storageBlue} size="large" />
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <Text style={styles.closeText}>✕</Text>
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
  webview: {
    backgroundColor: '#000',
    flex: 1
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    zIndex: 5
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    top: 20,
    width: 40,
    zIndex: 10
  },
  closeText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 16
  }
});

export default ModalVideo;
