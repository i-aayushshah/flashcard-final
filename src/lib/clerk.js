import { withAuth } from '@clerk/nextjs/api';

export const getAuth = (req) => {
  return withAuth(req);
};
