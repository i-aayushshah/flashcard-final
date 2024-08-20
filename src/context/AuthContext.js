import React, { createContext, useContext } from 'react';
import { useAuth as useClerkAuth } from '@clerk/nextjs';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const clerkAuth = useClerkAuth();

  const auth = {
    isAuthenticated: clerkAuth.isSignedIn,
    isLoading: !clerkAuth.isLoaded,
    user: clerkAuth.user ? {
      id: clerkAuth.user.id,
      email: clerkAuth.user.primaryEmailAddress?.emailAddress,
      name: `${clerkAuth.user.firstName} ${clerkAuth.user.lastName}`,
    } : null,
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
