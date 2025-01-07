import {Dimensions, Platform, Image, Text} from 'react-native';
import {hp} from '../Config/responsive';
const {width, height} = Dimensions.get('window');

const Colors = {
  primaryColor: '#92278F',
  black: '#000000',
  white: '#ffffff',
  themeColorDark: '#92278F',
  themeColorLight: '#EE2A7B',
  themeRed: 'rgba(215, 48, 0, 1)',
  themeBlack: '#2D2D2D',
  faceBookColor: '#1877F2',
  gray: 'rgba(45, 45, 45, 0.5)',
  grayBorder: '#D9D9D9',
  chatInputBorder: 'rgba(11, 180, 255, 1',
  avtiveCard: '#EAF6ED',
  inavtiveCard: '#F5E7E4',
  primaryColorFade: 'rgba(146,39,143,0.5)',
  themeExtraLight: '#e7bde6',
  fadeGreen: 'rgba(37, 204, 44, 1)',
  iconColor: 'rgba(238, 42, 123, 1)',
  grayFaded: 'rgba(255, 255, 255, 0.5)',
  textGray: 'rgba(154, 154, 154, 1)',
};

/** FontSize **/
const FontSize = {
  scale12: Math.round(width / 36),
  scale16: Math.round(width / 27),
  scale18: Math.round(width / 24),
  scale20: Math.round(width / 21.5),
  scale24: Math.round(width / 18),
  scale32: Math.round(width / 13.5),
  small: 8,
  medium: 10,
  regular: 12,
  default: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 20,
  xxxlarge: 22,
};

const Sizes = {
  width,
  height,
  h10: Math.round(height * 0.0125),
  h20: Math.round(height * 0.025),
};

const shadowStyleGlobal = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: hp('0.5'),
};

export {Colors, FontSize, Sizes, shadowStyleGlobal};
