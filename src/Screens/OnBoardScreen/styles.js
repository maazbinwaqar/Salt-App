import {Dimensions, Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: hp('3.5'),
    fontWeight: '500',
    marginTop: hp('5'),
    color: 'white',
  },
  message: {
    textAlign: 'center',
    fontWeight: '200',
    marginTop: hp('3'),
    lineHeight: hp('3'),
    color: 'white',
  },
  sliderView: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: wp('90'),
    marginTop: hp('5'),
    height: hp('6'),
  },
  nextButton: {width: wp('90'), alignSelf: 'center', marginTop: hp('8')},
});
