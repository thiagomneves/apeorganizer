import React, {createContext, useState} from 'react';
import {dark, light} from '../views/GlobalStyles';

export const ThemeContext = createContext({});

export function ThemeProvider({children}) {
  const [currentTheme, setCurrentTheme] = useState('light');

  const themes = {
    dark: dark,
    light: light,
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        chosenTheme: themes[currentTheme],
      }}>
      {children}
    </ThemeContext.Provider>
  );
}
