import { createContext, useContext, useState } from "react";
import { DEFAULT } from "../constants";
import { getLocalStorage } from "../utils/localStorage";
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getLocalStorage("theme") ?? DEFAULT);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
const useTheme = () => useContext(ThemeContext);
export { useTheme, ThemeProvider };
