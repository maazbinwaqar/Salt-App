import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import {Controller} from 'react-hook-form';
import {Colors} from '../Theme/Variables';
import {Touchable} from './Touchable';
import {hp, wp} from '../Config/responsive';
import {eye, eyeOff} from '../Assets';

export const InputComponent = ({
  minLength,
  placeholder,
  isRequired,
  isSecure,
  control,
  name,
  errors,
  type,
  autoCapitalize = 'none',
  defaultValue = '',
  isDisabled,
  maxLength,
  editable,
  viewStyle,
  isImage,
  forPasswordStyle,
  textStyle,
  inputIconStyle,
  inputLines,
  multiline,
  tintColor,
}) => {
  const [show, setShow] = useState(!isSecure);
  const handleClick = () => setShow(!show);
  const keyboardType = ['number', 'reset_code', 'phone'].includes(name)
    ? 'phone-pad'
    : 'default';
  return (
    <>
      <Controller
        render={({field: {onChange, value}}) => (
          <View style={{...styles.textfield, ...viewStyle}}>
            {isImage && (
              <Image
                source={isImage}
                style={{
                  resizeMode: 'contain',
                  tintColor,
                  ...styles.inputIcon,
                  ...inputIconStyle,
                }}
              />
            )}
            <TextInput
              type={type}
              maxLength={maxLength}
              style={{...forPasswordStyle}}
              numberOfLines={inputLines}
              multiline={multiline}
              {...{
                value,
                isDisabled,
                selectionColor: Colors.gray,
                placeholder,
                keyboardType,
                style: {...styles.input(isSecure), ...textStyle},
                secureTextEntry: !show,
                onChangeText: onChange,
                placeholderTextColor: Colors.gray,
                fontSize: hp('2'),
                autoCapitalize,
                autoCorrect: false,
                spellCheck: false,
                editable,
              }}
            />
            {isSecure && (
              <Touchable style={styles.eyeContainer} onPress={handleClick}>
                <Image
                  source={show ? eye : eyeOff}
                  style={{
                    resizeMode: 'contain',
                    tintColor: Colors.gray,
                    marginRight: wp('3'),
                  }}
                />
              </Touchable>
            )}
          </View>
        )}
        {...{
          name,
          control,
          defaultValue,
          rules: {required: Boolean(isRequired), minLength},
        }}
      />
      {errors[name]?.message && (
        <View
          style={
            {
              // width: Platform.OS == 'ios' ? width * 0.875 : Sizes.width * 0.9,
              // width: Sizes.width * 0.9,
            }
          }>
          <Text style={[styles.error]}>{errors[name]?.message}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textfield: {
    width: '100%',
    borderWidth: 1,
    height: hp('7'),
    // borderRadius: 15,
    marginVertical: hp('1'),
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'rgb(118, 118, 118)',
    marginTop: hp('2.5'),
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: wp('2'),
  },
  input: isSecure => ({
    height: '100%',
    width: isSecure ? '75%' : '86%',
    color: Colors.black,
    paddingHorizontal: wp('2'),
    paddingLeft: wp('3'),
    fontWeight: '500',
  }),
  eyeContainer: {
    width: 24,
    height: 24,
    // top: '30%',
    right: '0%',
    // marginRight: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: Colors.themeRed,
  },
  inputIcon: {
    // marginLeft: hp('2'),
    flex: 0.5,
  },
});
