import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

      if (!response.ok) throw new Error('Refresh failed');

      const data = await response.json();
      const accessToken = data.accessToken;
      console.log(data);

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        const decoded = parseJWT(accessToken);
        setIsLogin(true);
        setUserName(decoded?.name || null);
        setRole(decoded?.role || null);
        setEmail(decoded?.email || null);
        setUserId(decoded?.id || null);
      } else {
        throw new Error('Access token not returned');
      }
    } catch (error) {
      console.error('Refresh failed:', error);
      setIsLogin(false);
      setUserName(null);
      setRole(null);
      setEmail(null);
      setUserId(null);
      localStorage.removeItem('accessToken');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        await refreshToken();
        setIsLoading(false);
        return;
      }

      const decoded = parseJWT(token);
      const isExpired = decoded?.exp * 1000 < Date.now();

      if (isExpired) {
        await refreshToken();
      } else {
        setIsLogin(true);
        setUserName(decoded?.name || null);
        setRole(decoded?.role || null);
        setEmail(decoded?.email || null);
        setUserId(decoded?.id || null);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);


  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:9000/user/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.Message };
      }

      // Store access token
      localStorage.setItem("accessToken", data.accessToken);

      // Decode and update context immediately (no wait)
      const decoded = parseJWT(data.accessToken);
      setIsLogin(true);
      setUserName(decoded?.name || null);
      setRole(decoded?.role || null);
      setEmail(decoded?.email || null);
      setUserId(decoded?.id || null);

      return { success: true, message: data.Message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };


  return (
    <AuthContext.Provider
      value={{
        isLogin,
        userName,
        email,
        userId,
        isLoading,
        role,
        refreshToken,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
