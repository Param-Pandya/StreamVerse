import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { gStyle } from '../constants';

import HomeScreen from '../screens/Home';

const Stack = createNativeStackNavigator();

const StackHome = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen
      name="HomeMain"
      component={HomeScreen}
      options={{
        headerStyle: gStyle.navHeaderStyle
      }}
    />
  </Stack.Navigator>
);

export default StackHome;
