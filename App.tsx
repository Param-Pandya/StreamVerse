import * as React from 'react';
import { StatusBar, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { func } from './src/constants';
import { ProfileProvider } from './src/context/ProfileContext';
import { ToastProvider } from './src/context/ToastContext';

import { PaperProvider } from 'react-native-paper';

// main navigation stack
import Stack from './src/navigation/Stack';

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function prepare() {
      try {
        // pre-load/cache assets: images, fonts, and videos
        await func.loadAssetsAsync();
      } catch (e) {
        // console.warn(e);
      } finally {
        // loading is complete
        setIsLoading(false);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (isLoading === false) {
      // loading is complete, hide Splash Screen and show app
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <PaperProvider>
      <React.Fragment>
        <StatusBar barStyle="light-content" />

        <ProfileProvider>
          <ToastProvider>
            <NavigationContainer>
              <Stack />
            </NavigationContainer>
          </ToastProvider>
        </ProfileProvider>

        <View onLayout={onLayoutRootView} />
      </React.Fragment>
    </PaperProvider>
  );
};

export default App;
