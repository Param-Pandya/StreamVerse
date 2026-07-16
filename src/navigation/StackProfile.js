import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { gStyle } from '../constants';

// screens
import Profile from '../screens/Profile';
import ProfileAppSettings from '../screens/ProfileAppSettings';
import ProfileWatchlist from '../screens/ProfileWatchlist';

const Stack = createNativeStackNavigator();

const StackProfile = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerStyle: gStyle.navHeaderStyle
      }}
    />
    <Stack.Screen name="ProfileAppSettings" component={ProfileAppSettings} />
    <Stack.Screen name="ProfileWatchlist" component={ProfileWatchlist} />
  </Stack.Navigator>
);

export default StackProfile;
