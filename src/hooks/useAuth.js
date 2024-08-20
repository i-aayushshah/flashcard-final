import { useAuth as useClerkAuth } from '@clerk/nextjs';

export function useAuth() {
  const { isLoaded, isSignedIn, user, signOut } = useClerkAuth();

  return {
    isAuthenticated: isSignedIn,
    isLoading: !isLoaded,
    user: user ? {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      name: `${user.firstName} ${user.lastName}`,
    } : null,
    signOut,
  };
}
