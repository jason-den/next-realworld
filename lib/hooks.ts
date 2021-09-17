import { storage } from 'lib/utils/storage';
import useSWR from 'swr';
import { checkLogin } from 'lib/utils/checkLogin';
import { UserInfo } from '../types';
export const useLoginStatus = () => {
  const { data } = useSWR('user', storage);
  const isLogin = checkLogin(data);
  return { isLogin, user: data as UserInfo | undefined };
};
