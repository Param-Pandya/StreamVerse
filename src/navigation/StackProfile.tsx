import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { gStyle } from '../constants';
import Profile from '../screens/Profile';
import ProfileAppSettings from '../screens/ProfileAppSettings';
import ProfileWatchlist from '../screens/ProfileWatchlist';

export type ProfileStackParamList = {
  Profile: undefined;
  ProfileAppSettings: undefined;
  ProfileWatchlist: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const StackProfile: React.FC = () => (
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
        headerStyle: gStyle.navHeaderStyle as any
      }}
    />
    <Stack.Screen name="ProfileAppSettings" component={ProfileAppSettings} />
    <Stack.Screen name="ProfileWatchlist" component={ProfileWatchlist} />
  </Stack.Navigator>
);

export default StackProfile;
