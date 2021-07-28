import axios from 'axios';
import { BASE_URL } from 'lib/utils/constants';
import { mutate } from 'swr';
import { UserInfo } from 'types';

const Auth = {
  login: async (email: string, password: string) => {
    let user = undefined;

    try {
      const { data, status } = await axios.post(`${BASE_URL}/users/login`, { user: { email, password } });
      if (status == 200 && data?.user) {
        window.localStorage.setItem('user', JSON.stringify(data.user));
        mutate('user', data.user);
        user = data!.user;
        return { user, status };
      }
      return { error: 'Failed to login' };
    } catch (error) {
      return { error };
    }
  },

  signup: async (username: string, email: string, password: string) => {
    try {
      const { data, status } = await axios.post(`${BASE_URL}/users`, { user: { username, email, password } });
      if (status == 200) {
        window.localStorage.setItem('user', JSON.stringify(data.user));
        mutate('user', data.user);
        return { user: data!.user, status };
      }
      return { errors: [{ message: 'Failed to register' }] };
    } catch (error: any) {
      return { errors: error?.response?.data };
    }
  },
  save: async (user: UserInfo) => {
    try {
      const currentUser: any = JSON.parse(window.localStorage.getItem('user')!);
      const token = currentUser!.token;
      const { data, status } = await axios.put(
        `${BASE_URL}/user`,
        { user },
        { headers: { Authorization: `Token ${encodeURIComponent(token)}` } }
      );

      if (status == 200) {
        console.log('updated; user:', data.user);

        window.localStorage.setItem('user', JSON.stringify(data.user));
        mutate('user', data.user);
        return { user: data!.user, status };
      }
      return { errors: [{ message: 'Failed to update user' }], status };
    } catch (error: any) {
      return { errors: error?.response?.data?.errors, status: error?.response?.status };
    }
  }
};

export { Auth };
