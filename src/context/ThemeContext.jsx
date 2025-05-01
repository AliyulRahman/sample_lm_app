// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const storedTheme = localStorage.getItem("theme") || "light";
//   const [theme, setTheme] = useState(storedTheme);

//   useEffect(() => {
//     document.body.className = theme; // add class to body for global styling
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
