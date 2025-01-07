import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Config/responsive';
import {Colors} from '../../Theme/Variables';

export const styles = StyleSheet.create({
  logInMain: {
    flexGrow: 1,
    // paddingHorizontal: wp('3'),
    // paddingTop: hp('3'),
    // paddingBottom: hp('6'),
  },
  topImage: isIOS => ({
    position: 'absolute',
    fontSize: hp('4'),
    marginTop: isIOS ? hp('11') : hp('13'),
    alignSelf: 'center',
    marginLeft: wp('7'),
  }),
  inputView: {
    width: wp('90'),
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: hp('-26'),
    // position: 'absolute',
    zIndex: 1,
    borderRadius: 20,
    paddingHorizontal: wp('3'),
    // height: hp('100'),
    overflow: 'visible',
    shadowColor: '#011111',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 3,
    shadowRadius: 7.68,
    elevation: 10,
  },
  forgotText: {
    marginBottom: hp('3'),
    color: Colors.textGray,
    textAlign: 'right',
    marginTop: hp('2'),
    fontSize: hp('1.5'),
  },
  bottomTextView: {
    flexDirection: 'row',
    width: wp('90'),
    alignSelf: 'center',
    marginTop: hp('2'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  imageStyle: {width: wp('30'), height: hp('15')},
  lockstyle: {
    flex: 0.3,
  },
});
