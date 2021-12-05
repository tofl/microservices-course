import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

export default () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => { doRequest(); }, []);

  return <div>Signing you out...</div>
};
