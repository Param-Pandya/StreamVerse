import { ViewStyle, TextStyle } from 'react-native';
import colors from './colors';
import fonts from './fonts';

export interface GlobalStylesType {
  container: ViewStyle;
  flex1: ViewStyle;
  posAbsolute: ViewStyle;
  navHeaderStyle: ViewStyle;
  heading: TextStyle;
  spacer24: ViewStyle;
  spacer96: ViewStyle;
  mB8: ViewStyle;
  mR8: ViewStyle;
  mR16: ViewStyle;
  mV16: ViewStyle;
  mV24: ViewStyle;
  mV32: ViewStyle;
  p4: ViewStyle;
  p8: ViewStyle;
  p16: ViewStyle;
  pH4: ViewStyle;
  pH8: ViewStyle;
  pH16: ViewStyle;
}

const gStyle: GlobalStylesType = {
  container: {
    backgroundColor: colors.background,
    flex: 1
  },
  flex1: {
    flex: 1
  },
  posAbsolute: {
    position: 'absolute'
  },
  navHeaderStyle: {
    backgroundColor: colors.black,
    borderBottomWidth: 0,
    elevation: 0
  },
  heading: {
    color: colors.heading,
    fontFamily: fonts.regular,
    fontSize: 16,
    marginBottom: 4,
    marginTop: 16,
    paddingLeft: 16
  },
  spacer24: {
    height: 24,
    width: '100%'
  },
  spacer96: {
    height: 96,
    width: '100%'
  },
  mB8: {
    marginBottom: 8
  },
  mR8: {
    marginRight: 8
  },
  mR16: {
    marginRight: 16
  },
  mV16: {
    marginVertical: 16
  },
  mV24: {
    marginVertical: 24
  },
  mV32: {
    marginVertical: 32
  },
  p4: {
    padding: 4
  },
  p8: {
    padding: 8
  },
  p16: {
    padding: 16
  },
  pH4: {
    paddingHorizontal: 4
  },
  pH8: {
    paddingHorizontal: 8
  },
  pH16: {
    paddingHorizontal: 16
  }
};

export default gStyle;
