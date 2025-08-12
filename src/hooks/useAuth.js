import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const expiry = localStorage.getItem("token_expiry");
    const userData = localStorage.getItem("user_data");

    if (token && expiry && userData) {
      const now = new Date().getTime();
      if (now < Number(expiry)) {
        try {
          const user = JSON.parse(userData);
          setUser(user);
          setToken(token);
          return;
        } catch {
          // parse error
        }
      }
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("user_data");
    setUser(null);
    setToken(null);
  }, []);

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("user_data");
    setUser(null);
    setToken(null);
  }

  return { user, token, logout };
}
