/*
API Spec https://github.com/gothinkster/realworld/tree/main/api
*/
import axios from 'axios';
import { BASE_URL } from 'lib/utils/constants';
import { mutate } from 'swr';
import { UserInfo } from 'types';

interface APIResponseBase {
  data?: any;
  errors?: any[];
  status?: number;
}

interface Auth {
  login: (email: string, password: string) => Promise<APIResponseBase>;
}

const Auth = {
  login: async (email: string, password: string) => {
    let user = undefined;

    try {
      const { data, status } = await axios.post(
        `${BASE_URL}/users/login`,
        { user: { email, password } },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
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
      const { data, status } = await axios.post(
        `${BASE_URL}/users`,
        { user: { username, email, password } },
        { headers: { 'Access-Control-Allow-Origin': '*' } }
      );
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
        { headers: { Authorization: `Token ${encodeURIComponent(token)}`, 'Access-Control-Allow-Origin': '*' } }
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
/*
  JSON Object of profile:
  {
    "profile": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
      "following": false
    }
  }
*/
interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

interface ProfileAPI {
  get: (username: string) => Promise<APIResponseBase & { profile?: Profile }>;
}
const Profile: ProfileAPI = {
  /* Authentication optional, returns a Profile */
  get: async (username: string) => {
    if (typeof username != 'string' || username.length == 0) {
    }
    try {
      const { data, status } = await axios.get(`${BASE_URL}/profiles/${username}`, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
      if (status == 200) {
        console.log(data);
        const profile: Profile = data.profile;
        return { data, status, profile };
      } else return { errors: [{ message: 'Fail to get profile' }], data, status };
    } catch (error: any) {
      return { errors: error?.response?.data };
    }
  }
};

export { Auth, Profile };
