import {Alert, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  EventType,
  AndroidLaunchActivityFlag,
} from '@notifee/react-native';
import {requestNotifications, openSettings} from 'react-native-permissions';
import {useNavigation} from '@react-navigation/native';
import {store} from '../Redux/Reducer';
import {types} from '../Redux/types';
import NavigationService from './NavigationService';
// import NavigationService from './NavigationService';
// import useRouteName from '@/hooks/useRouteName';

// notifee.registerForegroundService(() => {});

const sound = Platform.select({ios: 'interval.wav', android: 'interval.mp3'});
const onNotificationNotiFee = async (data, appState) => {
  // const navigation = useNavigation();
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound,
  });

  // Display a notification
  notifee.displayNotification({
    ...data.notification,
    android: {
      channelId,
      ...data.notification.android,
      pressAction: {
        id: 'default',
        launchActivity: 'default',
        launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
      },
      // sound,
    },
    ios: {sound},
  });

  const getNameFunc = NavigationService.getCurrentRoute();
  const routeName = getNameFunc?.getCurrentRoute()?.name;

  const notificationData = JSON.parse(data.data.payload);

  const isRoute = Boolean(notificationData.is_route);

  const isInvitation = Boolean(notificationData.route == 'InvitationScreen');

  console.log('data=>>>>>dsdfsdfsdfdsfsdfds>>', notificationData, routeName);

  const storeObj = {
    InvitationScreen: types.addNotiInvitation,
    GeneralScreen: types.addNotification,
    MapAndChatScreen: types.addChatNoification,
  };

  isRoute &&
    routeName != 'InvitationScreen' &&
    store.dispatch({
      type: storeObj[notificationData.route],
      payload: notificationData,
    });
  // navigation.navigate('Invitation');
  // const isActive = Boolean(NavigationService.ref && appState == 'active');
  // const notificationObj = JSON.parse(data.data.payload);

  // if (
  //   isActive &&
  //   notificationObj?.notification_type == 'badge_unlocked' &&
  //   routeName != 'MusicPlayer'
  // ) {
  //   NavigationService.navigate('Congratulations', notificationObj || {});
  // }
};

// Register background handler
// backgroundListner = () => {
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);

//   const notificationData = JSON.parse(remoteMessage.data.payload);

//   const isRoute = Boolean(notificationData.is_route);

//   const isInvitation = Boolean(notificationData.route == 'InvitationScreen');

//   isRoute &&
//     store.dispatch({
//       type: isInvitation ? types.addNotiInvitation : types.addNotification,
//       payload: notificationData,
//     });

//   // store.dispatch(setNotificationLength(remoteMessage));
// });
// };

class FCMService {
  register = (onRegister, onOpenNotification, appState, onNotification) => {
    this.checkPermission(onRegister);
    this.registerDeviceForNotification();
    this.createNoitificationListeners(
      onRegister,
      onOpenNotification,
      appState,
      onNotification,
    );
  };

  checkPermission = async onRegister => {
    try {
      const authStatus = await messaging().hasPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) this.getToken(onRegister);
      else this.requestPermission(onRegister);
    } catch (error) {
      console.log(error);
    }
  };

  getToken = async onRegister => {
    await messaging().registerDeviceForRemoteMessages();
    messaging()
      .getToken()
      .then(res => onRegister(res))
      .catch(e => console.log('ndjkcsdkcnksdcnsdvnsd', e));
  };
  requestPermission = async onRegister => {
    try {
      const {status} = await requestNotifications(['alert', 'sound', 'badge']);
      if (status === 'granted') this.getToken(onRegister);
      else {
        Alert.alert(
          'Warning',
          `Push notifications have been ${status}. You will not receive any important notification unless enabled from settings.`,
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Open Setting',
              onPress: () => {
                openSettings().catch(() =>
                  console.warn('Cannot open settings'),
                );
              },
            },
          ],
          {
            userInterfaceStyle: 'light',
          },
        );
      }
    } catch (error) {
      console.log('Requested persmission rejected ', error);
    }
  };

  deletedToken = () => {
    messaging()
      .deleteToken()
      .catch(error => {
        console.log('Delected token error ', error);
      });
  };

  registerDeviceForNotification = async () => {
    try {
      if (!messaging().isDeviceRegisteredForRemoteMessages)
        await messaging().registerDeviceForRemoteMessages();
    } catch (error) {
      console.log(error);
    }
  };

  createNoitificationListeners = (
    onRegister,
    onOpenNotification,
    appState,
    onNotification,
  ) => {
    // Triggered  when a particular  notification  has been recevied in foreground
    this.notificationListener = messaging().onMessage(notification => {
      console.log('yyyyyyyyytytytytytytytytytytytt', notification);
      onNotification(notification);
    });

    // Triggered  when a particular  notification  has been recevied in foreground
    this.notificationListener = messaging().onMessage(
      data => onNotificationNotiFee(data, appState),
      console.log('notifynotifynotifynotifynotifynotify'),
      // {
      //   if (NavigationService.ref && appState == 'active') {
      //     NavigationService.navigate(
      //       'Congratulations',
      //       JSON.parse(data.data.payload) || {},
      //     );
      //   }
      // },
    );

    // If your app is backgound, you can listen for when a
    //notification is clicked / tapped / opened as follows
    this.notificationOpenedListener = messaging().onNotificationOpenedApp(
      notification => {
        console.log('onNotificationOpenedApp', notification);
        if (notification) onOpenNotification(notification);
        // this.removeDelieveredNotification(notification);
      },
    );

    // if your app is closed, you can check if  it was opened by notification
    // being  clicked / tapped / opened as follows
    notifee.getInitialNotification().then(notification => {
      console.log('getInitialNotification', notification);
      if (notification) onOpenNotification(notification);
      // this.removeDelieveredNotification(notification);
    });

    // Triggered for data only payload  in foreground
    this.messageListener = messaging().onMessage(message => {
      onNotification(message);
    });
    // Triggered when have  new token
    this.onTokenRefreshListener = messaging().onTokenRefresh(onRegister);

    this.forgroundListener = notifee.onForegroundEvent(
      async ({type, detail}) => {
        const {notification} = detail;
        console.log(
          'notificationnotificationnotificationnotificatioasdasdasdasdasdasnnotificationnotification',
          notification,
        );

        const isPressed = Boolean(
          type === EventType.ACTION_PRESS || type == EventType.PRESS,
        );
        if (isPressed) onOpenNotification(notification);
        if (type !== 7) await this.setBadge();
      },
    );
    this.backgroundListner = notifee.onBackgroundEvent(
      async ({type, detail}) => {
        const {notification} = detail;
        console.log(
          'notificationnotificationnotificatisdsdsonnoasdasdastificationnotificationnotification',
          notification,
          routeName,
        );
        let searchTerm = /invitation/;
        let findWord = Boolean(searchTerm.test(notification.body));
        const getNameFunc = NavigationService.getCurrentRoute();
        const routeName = getNameFunc?.getCurrentRoute()?.name;

        const storeObj = {
          InvitationScreen: types.addNotiInvitation,
          GeneralScreen: types.addNotification,
          MapAndChatScreen: types.addChatNoification,
        };

        // isRoute &&
        //   routeName != 'InvitationScreen' &&
        //   store.dispatch({
        //     type: storeObj[notificationData.route],
        //     payload: notificationData,
        //   });
        findWord &&
          routeName != 'InvitationScreen' &&
          store.dispatch({
            type: findWord ? types.addNotiInvitation : types.addNotification,
            payload: notification,
          });
        const isPressed = Boolean(
          type === EventType.ACTION_PRESS || type == EventType.PRESS,
        );
        if (isPressed) onOpenNotification(notification);
        if (type !== 7) await this.setBadge();
      },
    );
  };
  setBadge = (badge = 0) => notifee.setBadgeCount(badge);
  unRegister = () => {
    this.notificationListener();
    this.notificationOpenedListener();
    this.onTokenRefreshListener();
    this.forgroundListener();
    this.deletedToken();
    // this.backgroundListner();
    console.log('FCMService unRegister successfully');
  };
}

export const fcmService = new FCMService();
