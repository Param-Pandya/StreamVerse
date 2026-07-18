import { Dimensions, Platform } from 'react-native';

// android
const android = Platform.OS === 'android';

const iOS = Platform.OS === 'ios';
const web = Platform.OS === 'web';
const windowInfo = Dimensions.get('window');
const { height, width } = windowInfo;
const aspectRatio = height / width;

// is iPad
const isPad = Platform.OS === 'ios' && Platform.isPad;

// is iPhone with Notch?
// iPhoneX, iPhoneXs, iPhoneXr, iPhoneXs Max, iPhone 11, 12, 13, and 14
let iPhoneNotch = false;
if (iOS) {
  // iPhone screen dimensions checklist
  if (
    height === 812 ||
    height === 844 ||
    height === 852 ||
    height === 896 ||
    height === 926 ||
    height === 932
  ) {
    iPhoneNotch = true;
  }
}

export default {
  android,
  aspectRatio,
  height,
  iOS,
  iPhoneNotch,
  isPad,
  web,
  width
};
