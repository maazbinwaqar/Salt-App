/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  LogBox,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import StackNavigatior from './src/Navigation/navigation';
import {SplashScreen} from './src/Assets';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import useReduxStore from './src/Hooks/UseReduxStore';
import Overlay from './src/Components/Overlay';
import {fcmRegister, verifyUser} from './src/Redux/Action/AuthAction';
import {Colors} from './src/Theme/Variables';
import {hp, wp} from './src/Config/responsive';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const flexStyle = {flex: 1};
  const [isVisible, setIsVisible] = useState(true);
  const Hide_Splash_Screen = () => {
    setIsVisible(false);
  };
  const {getState, dispatch} = useReduxStore();
  const {isloading} = getState('isloading');
  const {isAlert} = getState('isAlert');

  const time = () => {
    return 2000;
  };

  const useEffectFun = () => {
    dispatch(verifyUser());
    // GoogleSignin.configure({
    //   webClientId:
    //     '1005053076444-mgrhj94e5bcv1a937pc07914jmevu2gv.apps.googleusercontent.com',
    // });
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'ViewPropTypes will be removed from React Native',
      'Settings is not yet supported on Android',
      'ViewPropTypes will be removed',
      "exported from 'deprecated-react-native-prop-types'.",
      'Sending...',
      'Non-serializable values were found in the navigation state',
    ]);
    LogBox.ignoreAllLogs(true);
    setTimeout(function () {
      Hide_Splash_Screen();
    }, time());
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
    View.defaultProps = View.defaultProps || {};
    View.defaultProps.allowFontScaling = false;
  };

  useEffect(useEffectFun, []);

  let Splash_Screen = (
    <ImageBackground
      source={SplashScreen}
      style={styles.SplashScreen_RootView}></ImageBackground>
  );

  return (
    <GestureHandlerRootView style={flexStyle}>
      {isloading && <Overlay />}
      <StatusBar
        hidden={isVisible}
        backgroundColor={Platform.OS == 'ios' ? 'white' : '#F2F2F2'}
        barStyle={'dark-content'}
      />
      {isVisible === true ? Splash_Screen : <StackNavigatior />}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  actionViewStyle: {
    width: wp('80'),
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: wp('2'),
    paddingVertical: hp('2'),
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: '600',
    color: Colors.black,
    fontSize: hp('2.5'),
  },
  modalMsg: {
    color: Colors.gray,
    fontSize: hp('1.8'),
    marginBottom: hp('3'),
  },
  cancelButtonStyle: {
    width: wp('33'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: hp('5'),
    borderColor: Colors.primaryColor,
    borderWidth: 0.2,
    borderRadius: 5,
  },
  confirmButtonStyle: {
    width: wp('33'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    height: hp('5'),
    borderRadius: 8,
    alignSelf: 'center',
    // marginTop: hp('1'),
  },
  modalCancelBtnText: {
    fontSize: hp('1.8'),
    color: '#212759',
  },
  modalcConfirmBtnText: {
    fontSize: hp('1.8'),
  },
});

export default App;
