  import React, { createContext, useContext, useEffect, useState } from 'react';

  const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // <-- added

    const parseJWT = (token) => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (err) {
        return null;
      }
    };

    const refreshToken = async () => {
      try {
        const response = await fetch('http://localhost:9000/user/token/RefreshAccessToken', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        const accessToken = data.accessToken;
        console.log(data);

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          const decoded = parseJWT(accessToken);
          setIsLogin(true);
          setUserName(decoded?.name || null);
          setEmail(decoded?.email || null);
        } else {
          throw new Error('Access token not returned');
        }
      } catch (error) {
        console.error('Refresh failed:', error);
        setIsLogin(false);
        setUserName(null);
        setEmail(null);
        localStorage.removeItem('accessToken');
      }
    };

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          await refreshToken();
          setIsLoading(false);  // <-- finish loading after refresh
          return;
        }

        const decoded = parseJWT(token);
        const isExpired = decoded?.exp * 1000 < Date.now();

        if (isExpired) {
          await refreshToken();
        } else {
          setIsLogin(true);
          setUserName(decoded?.name || null);
          setEmail(decoded?.email || null);
        }
        setIsLoading(false); // <-- finish loading after check
      };

      checkAuth();
    }, []);

    return (
      <AuthContext.Provider value={{ isLogin, userName, email, isLoading, refreshToken }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => useContext(AuthContext);

  export default AuthProvider;
