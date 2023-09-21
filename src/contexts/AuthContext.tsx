import { Dispatch, FC, ReactElement, SetStateAction, createContext, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext<{
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}>({
  token: '',
  setToken: () => {},
});
const AuthContextProvider = AuthContext.Provider;

export const STORAGE_KEY = 'token';

export const AuthProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(STORAGE_KEY));

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token],
  );

  return <AuthContextProvider value={contextValue}>{children}</AuthContextProvider>;
};
