// import {errorMessage} from '../../Components/NotificationMessage';
// import {loginUser} from '../../Redux/Actions/AuthAction';
// import API from '../../Utils/helperFunction';
// import {
//   faceBookLogin,
//   googleLogin,
//   PhoneNumberLogin,
//   verifyCode,
// } from '../../Utils/SocialLogin';
// import {loginUrl} from '../../Utils/Url';
import {useState} from 'react';
import {
  appleIdlogin,
  faceBookLogin,
  googleLogin,
} from '../../Utils/SocialLogin';
import {getFbResult, logOutFirebase} from '../../Services/AuthServices';
import useReduxStore from '../../Hooks/UseReduxStore';
import {loginUser, registerUser} from '../../Redux/Action/AuthAction';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');

const useLogin = ({navigate, goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.logIn,
  );
  const {dispatch} = useReduxStore();
  const [remember, setRemember] = useState(true);
  const rememberValue = () => {
    setRemember(!remember);
  };

  const onPress = () => navigate('RegisterScreen');

  const loginUserFun = ({email, password}) => {
    // navigate('EditPhoneNumberScreen');
    dispatch(registerUser({datas: {email, password}}));
  };
  // const loginUser = () => navigate('MybottomTabs');

  const goToForgotPassword = () => navigate('ForgotPasswordScreen');

  const googleLoginFunc = async () => {
    dispatch(loginUser({type: 'Google', datas: {}}));
  };
  const facebookLoginFunc = async () => {
    dispatch(loginUser({type: 'facebook', datas: {}}));
  };
  const appleIdlogin = async () => {
    dispatch(loginUser({type: 'appleID', datas: {}}));
  };

  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    facebookLoginFunc,
    googleLoginFunc,
    PhoneNumberLoginFuc: () => {},
    remember,
    setRemember,
    rememberValue,
    onPress,
    loginUser: loginUserFun,
    appleIdlogin,
    goToForgotPassword,
  };
};

export default useLogin;
