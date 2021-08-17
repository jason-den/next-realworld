import { UserInfo } from 'types';

const checkLogin = (currentUser: UserInfo) =>
  !!currentUser && currentUser?.constructor === Object && Object.keys(currentUser).length !== 0;

export { checkLogin };
