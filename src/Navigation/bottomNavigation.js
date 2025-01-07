import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  Platform,
  Dimensions,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import * as Screens from '../Screens/index';
import {Colors} from '../Theme/Variables';
import {hp, wp} from '../Config/responsive';
import {
  activeBar,
  bottomNavBellLottie,
  calender,
  calenderFill,
  heart,
  heartFill,
  home,
  home2,
  homeFill,
  map,
  map2,
  messages,
  messagesFill,
  notification,
  notification2,
  sendNotification,
  setting,
  setting2,
  settingFill,
} from '../Assets';
import useReduxStore from '../Hooks/UseReduxStore';
import Lottie from 'lottie-react-native';

globalStyles = {};
const isIOS = Boolean(Platform.OS == 'ios');

const Tab = createBottomTabNavigator();
function MybottomTabs() {
  const {getState} = useReduxStore();

  const {inviNotify} = getState('inviNotify');
  const {generalNotify} = getState('generalNotify');

  const inviNotifyStatus = Boolean(inviNotify.length > 0);
  const genNotifyStatus = Boolean(generalNotify.length > 0);

  const tabarComponent = (
    activeImage,
    unActiveImage,
    ImageStyle,
    isDot,
    DotStyles,
    isLottie,
  ) => {
    return {
      tabBarIcon: ({focused}) => (
        <View style={styles.tabarView}>
          {focused && (
            <Image
              resizeMode="contain"
              source={activeBar}
              style={styles.barStyle}
            />
          )}
          {isDot && (
            <View style={{...styles.dot, ...DotStyles}}>
              <Text style={styles.numberLength}>{inviNotify?.length}</Text>
            </View>
          )}
          {isLottie ? (
            <Lottie
              style={{...styles.imgstyle, ...ImageStyle}}
              resizeMode="contain"
              source={bottomNavBellLottie}
              autoPlay
              loop
            />
          ) : (
            <Image
              style={{...styles.imgstyle, ...ImageStyle}}
              source={focused ? activeImage : unActiveImage}
            />
          )}
        </View>
      ),
      title: '',
      tabBarLabelStyle: styles.tabarTitle,
    };
  };

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'black',
      }}
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'white',
        // tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: 'transparent',
        headerShown: false,
        // tabBarActiveBackgroundColor: 'white',
        // tabBarInactiveBackgroundColor: 'white',
        tabBarHideOnKeyboard: true,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarAllowFontScaling: true,
        tabBarItemStyle: {
          backgroundColor: 'white',
          // height: hp('10'),
        },
        tabBarStyle: {
          // height: isIOS ? hp('10') : hp('8'),
          // // height: hp('8'),
          borderTopWidth: 0,
          // width: wp('100'),
          // alignSelf: 'center',
          backgroundColor: 'white',
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          // overflow: 'hidden',
          height: hp('8'),
          paddingBottom: hp('0'),
          bottom: Platform.OS == 'ios' ? hp('1.7') : hp('1.5'),
          width: wp('100'),
          alignSelf: 'center',
          overflow: 'hidden',
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        options={tabarComponent(homeFill, home)}
        component={Screens.HomeScreen}
      />
      <Tab.Screen
        name="MessageScreen"
        options={tabarComponent(messagesFill, messages)}
        component={Screens.MessageScreen}
      />
      <Tab.Screen
        name="AppointmentScreen"
        options={tabarComponent(calenderFill, calender)}
        component={Screens.AppointmentScreen}
      />
      <Tab.Screen
        name="FavouriteScreen"
        options={tabarComponent(heartFill, heart)}
        component={Screens.FavouriteScreen}
      />
      <Tab.Screen
        name="SettingScreen"
        options={tabarComponent(settingFill, setting)}
        component={Screens.SettingScreen}
      />
    </Tab.Navigator>
  );
}
export default MybottomTabs;

const styles = StyleSheet.create({
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: hp('1.5'),
    backgroundColor: Colors.badgeColor,
  },
  tabarTitle: {
    display: 'none',
  },
  tabarView: (focused, last) => ({
    width: 'auto',
    backgroundColor: 'red',
    marginTop: hp('10'),
    // bottom: hp('0.5'),
  }),

  imgstyle: {
    resizeMode: 'contain',
    width: wp('7'),
  },
  dot: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
    // width: Dimensions.get('window').width * 0.03,
    // height: Dimensions.get('window').width * 0.03,
    position: 'absolute',
    left: wp('4'),
    top: hp('0.5'),
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  numberLength: {
    color: 'white',
    textAlignVertical: 'center',
    fontSize: hp('1'),
    marginHorizontal: wp('1.5'),
    marginVertical: hp('0.2'),
  },
  barStyle: {
    width: wp('10'),
    position: 'absolute',
    right: wp('-1'),
    bottom: Platform.OS == 'ios' ? hp('7') : hp('7.5'),
  },
});
