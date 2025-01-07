import React from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {Colors, FontFamily} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {hp, wp} from '../Config/responsive';

const TransparentBtn = ({
  title,
  onPress,
  image,
  style,
  textStyle,
  btnStyle,
}) => {
  return (
    <Touchable
      Opacity={0.7}
      onPress={onPress}
      style={[styles.button, {justifyContent: 'center', ...style}]}>
      <Text style={[styles.text, {...textStyle}]}>{title}</Text>
    </Touchable>
  );
};

export default TransparentBtn;

const styles = StyleSheet.create({
  button: {
    height: hp('5'),
    width: '44%',
    borderRadius: 13,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  },
  text: {
    fontSize: hp('2'),
    color: Colors.black,
    textAlign: 'center',
    marginLeft: wp('3'),
    fontWeight: 400,
  },
  linearGradient: {
    borderRadius: 10,
  },
});
