import { standardReq, IBaseAPIReq } from "./utils";

export interface IUser {
  updated: string;
  created: string;
  lastLogin: string;
  userStatus: string;
  socialAccount: string;
  displayName?: string;
  avatar?: string;
  nickname?: string;
  user_token: string;
}

export interface ISignInCredentials {
  password: string;
  login: string;
}

export interface IRegisterCredentials {
  email: string;
  name: string;
  password: string;
  nickname: string;
}

interface IUserInfo extends IBaseAPIReq {
  user?: IUser;
}

export interface IHandleUserReturn extends IUserInfo {
  success: boolean;
}

export type TSignIn = (credentials: ISignInCredentials) => void;
export type TSignOut = () => void;

const handleUserReturn = ({ user, errors }: IUserInfo) => {
  console.log("users", user);
  return {
    success: user && user.nickname ? true : false,
    user,
    errors,
  };
};

export const logUser = async (user: ISignInCredentials) => {
  const userInfo = await standardReq({
    path: "users/login",
    body: JSON.stringify(user),
    method: "POST",
  });
  //console.log("usrInfo", userInfo);
  return userInfo; //handleUserReturn(userInfo);
};

export const registerUser = async (user: IRegisterCredentials) => {
  const userInfo = await standardReq({
    path: "users/register",
    body: JSON.stringify(user),
    method: "POST",
  });
  return handleUserReturn(userInfo);
};

export const getUser = async (token: string) => {
  const userInfo = await standardReq({
    path: "user",
    method: "GET",
    token,
  });
  return handleUserReturn(userInfo);
};

export interface IUserUpdate {
  email: string;
  username: string;
  bio?: string;
  image?: string;
  password?: string;
}

export const updateUser = async (user: IUserUpdate, token: string) => {
  const userInfo = await standardReq({
    path: "user",
    method: "PUT",
    token,
    body: JSON.stringify({ user }),
  });
  return handleUserReturn(userInfo);
};
