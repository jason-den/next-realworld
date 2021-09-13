/*
Profile page (URL: /#/profile/:username)
- Show basic user info
- List of articles populated from user's created articles 
*/

import { useEffect, useState } from 'react';
import { Profile } from 'lib/api';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const username = router.query['username'];

  const [state, setState] = useState<any>(undefined);
  useEffect(() => {
    Profile.get('sopa').then(({ profile, errors, status, data }) => {
      console.log({ profile, errors, status, data });
      setState(profile);
    });
  }, [username]);
  return (
    <div>
      This is user page
      {JSON.stringify(state)}
    </div>
  );
}
