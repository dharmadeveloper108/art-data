import { createContext, useContext, useState } from "react";
import React from "react";

//TODO: implement actual less rudimentary authentication 🤪

export interface AuthContext {
  loading: boolean;
  getBearerToken(): string;
}

const AuthContext = createContext<AuthContext>({
  loading: true,
  getBearerToken: () => "",
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const getBearerToken = (): string => {
    return process.env.BEARER_TOKEN!;
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        getBearerToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
