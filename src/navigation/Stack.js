import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// grab screens
import ModalAddProfile from '../screens/ModalAddProfile';
import ModalManageProfiles from '../screens/ModalManageProfiles';
import ModalVideo from '../screens/ModalVideo';
import ModalWebView from '../screens/ModalWebView';
import MovieDetails from '../screens/MovieDetails';

// grab tabbed stacks
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Main"
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="Main" component={TabNavigator} />
    <Stack.Screen name="MovieDetails" component={MovieDetails} />

    {/* Modals */}
    <Stack.Group screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen name="ModalAddProfile" component={ModalAddProfile} />
      <Stack.Screen
        name="ModalManageProfiles"
        component={ModalManageProfiles}
      />
      <Stack.Screen name="ModalVideo" component={ModalVideo} />
      <Stack.Screen name="ModalWebView" component={ModalWebView} />
    </Stack.Group>
  </Stack.Navigator>
);

export default StackNavigator;
