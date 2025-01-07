import auth from '@react-native-firebase/auth';
import {
  VerifyUserUrl,
  checkNumberBeforeRegisterUrl,
  fcmToken,
  loginUrl,
  logoutUrl,
  registerUrl,
} from '../Utils/Urls';
import API from '../Utils/helperFunc';

const getFbResult = () => auth().currentUser.getIdTokenResult();

const loginService = param => API.post(loginUrl, param);

const registerService = param => API.post(registerUrl, param);

const checkNumberService = param =>
  API.get(checkNumberBeforeRegisterUrl + param);

const logoutService = async () => await API.get(logoutUrl);

const fcmRegService = async params =>
  await API.post(fcmToken, {fcm_token: params});

const verifyService = async () => await API.get(VerifyUserUrl);

const randomService = async ({url, params}) =>
  await API.post(url, {answer: params});

//updateProfile in Firebase
const updateProfileFirebase = params => {
  // const {Auth} = store.getState();
  // firestore().collection('users').doc(Auth.userData.agoraId).update(params);
};

const updateProfileServices = async params => {
  const formData = new FormData();
  Object.entries(params.profileData).forEach(([key, val]) => {
    if (key == 'image' && val?.type) formData.append(key, {});
    // formData.append(key, {
    //   name: val?.fileName || val?.name || 'image',
    //   type: val?.type,
    //   uri: Platform.OS == 'ios' ? val?.uri.replace('file://', '') : val?.uri,
    // });
    else formData.append(key, val);
  });
  return await API.post('auth/checking', {});
};

const createUserFirestore = ({datas, data}) => {
  firestore()
    .collection('users')
    .doc(data?.user.agoraId)
    .set({
      ...datas,
      userId: data?.user.agoraId,
      profilePicture: data?.user.profilePicture,
    });
  console.log('User added!');
};

const logOutFirebase = () => auth().signOut();

export {
  getFbResult,
  loginService,
  logOutFirebase,
  registerService,
  logoutService,
  updateProfileServices,
  randomService,
  fcmRegService,
  checkNumberService,
  // createAgoraUser,
  // loginWithAgora,
  // AgoraServerToken,
  // AgoraLogout,
  // getAllAgoraUser,
  createUserFirestore,
  updateProfileFirebase,
  verifyService,
  // createTelematicUser,
  // loginTelematicUser,
};
