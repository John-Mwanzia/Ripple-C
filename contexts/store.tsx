'use client';

import { getCookie } from 'cookies-next';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext<{ token: string; setToken: (token: string) => void }>({
    token: '',
    setToken: () => {},
    });

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getCookie('auth_token')); // Read token from cookie initially

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};