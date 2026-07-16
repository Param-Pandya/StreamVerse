import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { gStyle } from '../constants';

import SearchScreen from '../screens/Search';

const Stack = createNativeStackNavigator();

const StackSearch = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen
      name="SearchMain"
      component={SearchScreen}
      options={{
        headerStyle: gStyle.navHeaderStyle
      }}
    />
  </Stack.Navigator>
);

export default StackSearch;
