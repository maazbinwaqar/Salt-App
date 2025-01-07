import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {share} from '@/Assets/Images';
import {hp, wp} from '../Config/responsive';

const ThemeButton = ({title, onPress, image, style, textStyle}) => {
  return (
    // <ShadowButton>
    <Touchable
      Opacity={0.7}
      onPress={onPress}
      style={[styles.button, {justifyContent: 'center', ...style}]}>
      <Text style={[styles.text, {...textStyle}]}>{title}</Text>
      {image && <Image source={image} style={styles.image} />}
    </Touchable>
    // </ShadowButton>
  );
};

export default ThemeButton;

const styles = StyleSheet.create({
  button: {
    height: hp('6.5'),
    width: '100%',
    borderRadius: 10,
    // marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    // paddingHorizontal: '22.5%',
    justifyContent: 'center',
    backgroundColor: Colors.themeRed,
  },
  image: {
    width: 20,
    height: 20,
    // marginBottom: 5,
    resizeMode: 'contain',
  },
  text: {
    // fontSize: heightPercentageToDP('2'),
    color: Colors.white,
    textAlign: 'center',
    marginRight: wp('3'),
    // fontFamily: FontFamily.regular,
  },
});
