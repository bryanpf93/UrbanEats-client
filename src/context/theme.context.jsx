import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function ThemeProviderWrapper({ children }) {
  const [colorScheme, setColorScheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setColorScheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme =
      colorScheme === "light" ? "dark" : "light";

    setColorScheme(newTheme);

    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProviderWrapper;