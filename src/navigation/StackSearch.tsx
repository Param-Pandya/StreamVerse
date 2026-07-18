import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { gStyle } from '../constants';
import SearchScreen from '../screens/Search';

export type SearchStackParamList = {
  SearchMain: undefined;
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

const StackSearch: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen
      name="SearchMain"
      component={SearchScreen}
      options={{
        headerStyle: gStyle.navHeaderStyle as any
      }}
    />
  </Stack.Navigator>
);

export default StackSearch;
