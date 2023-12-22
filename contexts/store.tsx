'use client';

import React, { createContext, ReactNode, useReducer } from 'react';

export const Store = createContext(null);

interface State {
  token: string | null;

}

interface Action {
  type: string;
  payload?: any; 
}

const initialState: State = {
  token:typeof window !== 'undefined' && localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
  
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', JSON.stringify(action.payload));
      return { ...state, token: action.payload };
    case 'LOGOUT':
      localStorage.clear();
      return { ...state, token: null };
    default:
      return state;
  }
}

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider(props: StoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
