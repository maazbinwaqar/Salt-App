import {call, delay, put, takeLatest} from 'redux-saga/effects';
import {types} from '../types';
import {
  appleIdlogin,
  emailLogin,
  emailSignUp,
  faceBookLogin,
  forgotPasswordServices,
  googleLogin,
} from '../../Utils/SocialLogin';
import {updateAuth} from '../Action/AuthAction';
import {loadingFalse, loadingTrue} from '../Action/isloadingAction';
import {
  checkNumberService,
  fcmRegService,
  getFbResult,
  logOutFirebase,
  loginService,
  logoutService,
  registerService,
  updateProfileServices,
  verifyService,
} from '../../Services/AuthServices';
import {errorMessage, successMessage} from '../../Config/NotificationMessage';
import NavigationService from '../../Services/NavigationService';

const loginObject = {
  Google: () => googleLogin(),
  facebook: () => faceBookLogin(),
  email: datas => emailSignUp(datas),
  appleID: () => appleIdlogin(),
};

/* `const loginSaga` is a generator function that is used as a saga in a Redux-Saga middleware. It
takes an action object as an argument, destructures its `payload` property to get `datas` and `type`
properties, and then performs a series of asynchronous operations using the `yield` keyword. */
const loginSaga = function* ({payload: {datas, type}}) {
  yield put(loadingTrue());
  try {
    const {ok, data} = yield call(checkNumberService, datas?.number);
    console.log('jkdsbfjksdbfjkdsbfjkdbjfbsdjf', data);
    if (ok) {
      const getLoginData = loginObject[type];
      const resultData = yield call(getLoginData, datas);
      const {socialData, status} = {socialData: resultData, status: true};
      if (status) {
        const idTokenResult = yield call(getFbResult);
        const jwtToken = idTokenResult.token;
        if (jwtToken) {
          console.log('jwtToken', jwtToken);
          // if (socialData.isNewUser || type == 'email') {
          //   var {result} = yield call(createTelematicUser, {
          //     token: deviceToken,
          //     data: datas.name ? datas : socialData,
          //   });
          // }
          const {data, ok} = yield call(registerService, {
            token: jwtToken,
            name: datas?.name,
            email: datas?.email,
            password: datas?.password,
            phone: datas?.number,
          });
          console.log('data=========>>>>>>>', data);
          yield put(loadingTrue());
          if (ok) {
            yield put(loadingTrue());
            yield put(updateAuth(data));
            if (data.user.is_verified == 0) {
              delay('100');
              yield call(NavigationService.navigate, 'EditPhoneNumberScreen');
            }
            // if (data.user.isNewUser) {
            //   yield call(sendPhoneBookTOServer);
            //   yield call(getContactFromSql);
            // } else {
            //   yield call(checkSqlDataBase);
            //   yield call(getContactFromSql);
            // }
          } else {
            errorMessage(data?.message);
          }
        }
      }
    } else errorMessage(data?.message);
  } catch (error) {
    errorMessage(error?.message.split(' ').slice(1).join(' ') ?? error);
    console.log('err', error);
  } finally {
    yield put(loadingFalse());
  }
};

/* `registerSaga` is a generator function that is used as a saga in a Redux-Saga middleware. It takes
an action object as an argument, destructures its `payload` property to get `datas`, and then
performs a series of asynchronous operations using the `yield` keyword. */
function* registerSaga({payload: {datas}}) {
  yield put(loadingTrue());
  try {
    const result = yield call(emailLogin, datas);
    const {data, ok} = {data: result, ok: true};
    if (ok) {
      const idTokenResult = yield call(getFbResult);
      const jwtToken = idTokenResult.token;
      if (jwtToken) {
        const {data, ok} = yield call(loginService, {
          token: jwtToken,
        });
        yield put(loadingTrue());
        console.log('sdjbfjksdbfjbsdjfbsdf', data);
        if (ok) {
          yield put(loadingTrue());
          yield put(updateAuth(data));
          if (data.user.is_verified == 0) {
            delay('100');
            yield call(NavigationService.navigate, 'EditPhoneNumberScreen');
          }
          // if (data.user.isNewUser) {
          //   yield call(sendPhoneBookTOServer);
          //   yield call(getContactFromSql);
          // } else {
          //   yield call(checkSqlDataBase);
          //   yield call(getContactFromSql);
          // }
        } else {
          errorMessage(data?.message);
        }
      }
    }
  } catch (error) {
    errorMessage(
      error?.message.split(' ').slice(1).join(' ') ?? error ?? error?.message,
    );
    console.log('slbklsdbbsdfkgbsdklbgs', error);
  } finally {
    // delay(4000);
    yield put(loadingFalse());
  }
}

/* `logOutSaga` is a generator function that is used as a saga in a Redux-Saga middleware. It takes an
action object as an argument, but it is not used in the function. The function performs a series of
asynchronous operations using the `yield` keyword. */
function* logOutSaga(action) {
  try {
    // yield call(logoutService);
    yield put({type: types.LogoutType});
    yield call(logOutFirebase);
    yield put({type: types.ClearNotify});
    yield put({type: types.ClearContacts});
    yield put({type: types.clearAllChatNotifyObj});
    yield put({type: types.ClearNotifyInvitation});
    console.log('okokok');
  } catch (error) {
    errorMessage(error?.message.split(' ').slice(1).join(' '));
  } finally {
    yield put(loadingFalse());
  }
}
/* The `updateProfileSaga` function is a generator function that is used as a saga in a Redux-Saga
middleware. It takes an action object as an argument, destructures its `payload` property to get
`profileData`, and then performs a series of asynchronous operations using the `yield` keyword. */

function* updateProfileSaga({payload: profileData}) {
  yield put(loadingTrue());
  try {
    // console.log('dbnjdf', profileData);
    const {ok, data, originalError} = yield call(
      updateProfileServices,
      profileData,
    );
    console.log('user', originalError, data);
    if (ok) {
      yield put({type: types.UpdateProfile, payload: data.data});
      // successMessage('Your profile has been updated');
    } else errorMessage(data?.message);
  } catch (error) {
    console.log('error ', error);
    errorMessage(error?.message.split(' ').slice(1).join(' '));
  } finally {
    delay(2000);
    yield put(loadingFalse());
  }
}

/* This function is used to reset the user password. */
function* forgotUserSaga(action) {
  try {
    yield put(loadingTrue());
    yield call(forgotPasswordServices, action.payload);
    successMessage('Password Reset Request has been sent to your mail');
    NavigationService.navigate('LoginScreen');
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    delay(1000);
    yield put(loadingFalse());
  }
}

/* The `verifySage` function is a generator function that is used as a saga in a Redux-Saga middleware.
It takes an action object as an argument, but it is not used in the function. The function performs
a series of asynchronous operations using the `yield` keyword. In this case, it calls the
`verifyService` function to verify the user's profile and updates the profile data if the
verification is successful. */
function* verifySage(action) {
  try {
    const {ok, data} = yield call(verifyService);
    if (ok) yield put({type: types.UpdateProfile, payload: data});
  } catch (error) {
    errorMessage(error.message.split(' ').slice(1).join(' '));
  } finally {
    delay(1000);
    yield put(loadingFalse());
  }
}

/* This function is used to add the fcm token to the database. */
function* fcmTokenSaga(action) {
  yield call(fcmRegService, action.payload);
}

function* authSaga() {
  yield takeLatest(types.LoginType, loginSaga);
  yield takeLatest(types.LogoutFirebaseType, logOutSaga);
  yield takeLatest(types.RegisterUser, registerSaga);
  yield takeLatest(types.UpdateUser, updateProfileSaga);
  yield takeLatest(types.fcmRegType, fcmTokenSaga);
  yield takeLatest(types.forgotPasswordType, forgotUserSaga);
  yield takeLatest(types.VerifyType, verifySage);
}

export default authSaga;
