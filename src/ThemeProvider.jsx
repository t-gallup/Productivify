import { createContext, useState, useEffect } from "react";

const themes = {
  dark: {
    backgroundColor: "#1a1a1a",
    color: "white",
  },
  light: {
    backgroundColor: "white",
    color: "#2F4F4F",
  },
};

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? themes.dark : themes.light;
  const changeTheme = () => {
    localStorage.setItem("isDark", JSON.stringify(!isDark));
    setIsDark(!isDark);
  };

  useEffect(() => {
    const isDark = localStorage.getItem('isDark') === "true";
    setIsDark(isDark)
  }, [])
  return (
    <ThemeContext.Provider value={[{ theme, isDark }, changeTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider