import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { gStyle } from '../constants';

import DownloadsScreen from '../screens/Downloads';

const Stack = createNativeStackNavigator();

const StackDownloads = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen
      name="DownloadsMain"
      component={DownloadsScreen}
      options={{
        headerStyle: gStyle.navHeaderStyle
      }}
    />
  </Stack.Navigator>
);

export default StackDownloads;
