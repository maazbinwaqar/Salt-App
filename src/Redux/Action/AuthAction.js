import {types} from '../types';

export const loginUser = payload => ({
  type: types.LoginType,
  payload,
});

export const updateUser = payload => ({
  type: types.UpdateUser,
  payload,
});

export const logOutAuth = () => ({
  type: types.LogoutType,
});

export const logOutUser = payload => ({
  type: types.LogoutFirebaseType,
  payload,
});

export const updateAuth = payload => ({
  type: types.UpdateAuth,
  payload,
});

export const registerUser = payload => ({
  type: types.RegisterUser,
  payload,
});

export const fcmRegister = payload => ({
  type: types.fcmRegType,
  payload,
});

export const forgotPasswordAction = payload => ({
  type: types.forgotPasswordType,
  payload,
});

export const verifyUser = payload => ({
  type: types.VerifyType,
  payload,
});
