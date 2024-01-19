"use client";

import { jwtDecode } from "jwt-decode";
import React, { createContext, ReactNode, useReducer } from "react";

export const Store = createContext(null);
interface State {
  token: MyDecodedToken | null; // Allow decoded token or null
  // ...other properties
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  token:
    typeof window !== "undefined" && localStorage.getItem("newtoken")
      ? JSON.parse(localStorage.getItem("newtoken"))
      : null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("newtoken", JSON.stringify(action.payload));
      return { ...state, token: action.payload };
    case "LOGOUT":
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
