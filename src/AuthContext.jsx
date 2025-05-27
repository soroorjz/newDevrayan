import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("RayanToken") || "");

  // بررسی ورود کاربر هنگام بارگذاری صفحه
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // دریافت توکن از API
  const fetchToken = useCallback(async () => {
    try {
      const response = await fetch("/api/auth", {
        headers: {
          "RAYAN-USERNAME": "S.JAMEIE",
          "RAYAN-PASSWORD": "1156789",
          "RAYAN-DEBUG": true,
        },
        method: "post",
      });
      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("RayanToken", data.token);
    } catch (err) {
      console.error("Error fetching token:", err);
    }
  }, []);

  // ورود کاربر
  const login = (username) => {
    const userData = { username, avatar: "/assets/images/user-avatar.png" };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // خروج کاربر
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("RayanToken");
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, fetchToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// هوک اختصاصی AuthContext
export const useAuth = () => useContext(AuthContext);
