import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, images } from '../constants';
import { ProfileContext } from '../context/ProfileContext';

// grabs stacks
import StackHome from './StackHome';
import StackSearch from './StackSearch';
import StackDownloads from './StackDownloads';
import StackProfile from './StackProfile';

// icons
import SvgHome from '../components/icons/Svg.Home';
import SvgSearch from '../components/icons/Svg.Search';
import SvgDownloads from '../components/icons/Svg.Downloads';

export type TabNavigatorParamList = {
  StackHome: undefined;
  StackSearch: undefined;
  StackDownloads: undefined;
  StackProfile: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

interface ProfileIconProps {
  focused: boolean;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ focused }) => {
  const context = React.useContext(ProfileContext);
  const borderColor = focused ? { borderColor: colors.white } : {};

  if (!context) return null;
  const { activeProfile } = context;

  return (
    <View style={[styles.containerProfile, borderColor]}>
      <Image source={images[activeProfile.avatar] || images.elsa} style={styles.avatar} />
    </View>
  );
};

const TabNavigator: React.FC = () => (
  <Tab.Navigator
    initialRouteName="StackHome"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.white,
      tabBarInactiveTintColor: colors.inactiveGrey,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: colors.tabBackground,
        borderTopWidth: 0
      }
    }}
  >
    <Tab.Screen
      name="StackHome"
      component={StackHome}
      options={{
        tabBarIcon: ({ focused }) => <SvgHome active={focused} />
      }}
    />
    <Tab.Screen
      name="StackSearch"
      component={StackSearch}
      options={{
        tabBarIcon: ({ focused }) => <SvgSearch active={focused} />
      }}
    />
    <Tab.Screen
      name="StackDownloads"
      component={StackDownloads}
      options={{
        tabBarIcon: ({ focused }) => <SvgDownloads active={focused} />
      }}
    />
    <Tab.Screen
      name="StackProfile"
      component={StackProfile}
      options={{
        tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  containerProfile: {
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: 20,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 40
  },
  avatar: {
    height: '100%',
    resizeMode: 'contain',
    width: '100%'
  }
});

export default TabNavigator;
