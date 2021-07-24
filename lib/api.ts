import axios from 'axios';

import { BASE_URL } from 'lib/utils/constants';

const Auth = {
  login: async (email: string, password: string) => {
    let user = undefined;

    try {
      const { data, status } = await axios.post(`${BASE_URL}/users/login`, { user: { email, password } });
      if (status == 200 && data?.user) {
        window.localStorage.setItem('user', JSON.stringify(data.user));
        user = data!.user;
        return { user, status };
      }
      return { error: 'Failed to login' };
    } catch (error) {
      return { error };
    }
  }
};
export { Auth };
