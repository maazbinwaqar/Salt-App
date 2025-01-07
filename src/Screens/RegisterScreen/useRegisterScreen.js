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
import {loginUser} from '../../Redux/Action/AuthAction';
import useReduxStore from '../../Hooks/UseReduxStore';

const {default: useFormHook} = require('../../Hooks/UseFormHooks');
const {default: Schemas} = require('../../Utils/Validation');

const useRegister = ({navigate, goBack}) => {
  const {handleSubmit, errors, reset, control, getValues} = useFormHook(
    Schemas.signUp,
  );
  const {dispatch} = useReduxStore();
  const [remember, setRemember] = useState(false);
  const [number, setNumber] = useState(null);
  const [error, setError] = useState(null);
  const rememberValue = () => {
    setRemember(!remember);
  };

  const signUpButton = ({name, email, password, confirm_password}) => {
    if (number != '' && number != null) {
      setError(null);
      dispatch(
        loginUser({type: 'email', datas: {name, email, number, password}}),
      );
    } else setError('Please enter your number');
  };
  const loginNav = () => navigate('LoginScreen');

  return {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    facebookLoginFunc: () => {},
    googleLoginFunc: () => {},
    PhoneNumberLoginFuc: () => {},
    remember,
    setRemember,
    rememberValue,
    goBack,
    loginNav,
    signUpButton,
    error,
    number,
    setNumber,
  };
};

export default useRegister;
