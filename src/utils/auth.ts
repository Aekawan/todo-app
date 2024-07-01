import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

export const requireAuth = (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return null;
};