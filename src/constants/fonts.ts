import { Platform } from 'react-native';

const bold = Platform.select({
  android: 'sans-serif-condensed',
  ios: 'HelveticaNeue-Bold',
  default: 'Helvetica Neue'
});

const light = Platform.select({
  android: 'sans-serif-light',
  ios: 'HelveticaNeue-Light',
  default: 'Helvetica Neue'
});

const medium = Platform.select({
  android: 'sans-serif-medium',
  ios: 'HelveticaNeue-Medium',
  default: 'Helvetica Neue'
});

const regular = Platform.select({
  android: 'sans-serif',
  ios: 'HelveticaNeue',
  default: 'Helvetica Neue'
});

export default {
  bold,
  light,
  medium,
  regular
};
