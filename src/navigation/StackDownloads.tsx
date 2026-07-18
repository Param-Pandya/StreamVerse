import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { gStyle } from '../constants';
import DownloadsScreen from '../screens/Downloads';

export type DownloadsStackParamList = {
  DownloadsMain: undefined;
};

const Stack = createNativeStackNavigator<DownloadsStackParamList>();

const StackDownloads: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen
      name="DownloadsMain"
      component={DownloadsScreen}
      options={{
        headerStyle: gStyle.navHeaderStyle as any
      }}
    />
  </Stack.Navigator>
);

export default StackDownloads;
