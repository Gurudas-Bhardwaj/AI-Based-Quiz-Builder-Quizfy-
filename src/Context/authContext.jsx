import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Backend base URL
const BACKEND_URL = "https://quizidy-backend.duckdns.org";

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Parse JWT Token ---
  const parseJWT = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      console.error("JWT parse error:", err);
      return null;
    }
  };

  // --- Refresh Access Token ---
  const refreshToken = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/token/RefreshAccessToken`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Refresh failed");

      const data = await response.json();
      const accessToken = data.accessToken;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        const decoded = parseJWT(accessToken);

        setIsLogin(true);
        setUserName(decoded?.name || null);
        setEmail(decoded?.email || null);
        setUserId(decoded?.id || null);

        return true;
      } else {
        throw new Error("No access token returned");
      }
    } catch (err) {
      console.error("Refresh failed:", err);
      localStorage.removeItem("accessToken");
      setIsLogin(false);
      setUserName(null);
      setEmail(null);
      setUserId(null);
      return false;
    }
  };

  // --- Check Auth on mount & Setup auto-refresh ---
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        await refreshToken();
      } else {
        const decoded = parseJWT(token);
        const isExpired = decoded?.exp * 1000 < Date.now();

        if (isExpired) {
          await refreshToken();
        } else {
          setIsLogin(true);
          setUserName(decoded?.name || null);
          setEmail(decoded?.email || null);
          setUserId(decoded?.id || null);
        }
      }

      setIsLoading(false);
    };

    initializeAuth();

    // --- Background auto-refresh interval ---
    const interval = setInterval(async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decoded = parseJWT(token);
        const expiresIn = decoded?.exp * 1000 - Date.now();

        // Refresh if less than 2 minutes left
        if (expiresIn < 2 * 60 * 1000) {
          await refreshToken();
        }
      }
    }, 60 * 1000); // every 1 minute

    return () => clearInterval(interval);
  }, []);

  // --- Login ---
  const login = async (email, password) => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) return { success: false, message: data.Message };

      localStorage.setItem("accessToken", data.accessToken);
      const decoded = parseJWT(data.accessToken);

      setIsLogin(true);
      setUserName(decoded?.name || null);
      setEmail(decoded?.email || null);
      setUserId(decoded?.id || null);

      return { success: true, message: data.Message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  // --- Logout ---
  const logout = async () => {
    try {
      await fetch(`${BACKEND_URL}/user/Logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("accessToken");
      setIsLogin(false);
      setUserName(null);
      setEmail(null);
      setUserId(null);
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
        refreshToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
