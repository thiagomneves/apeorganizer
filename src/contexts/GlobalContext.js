import React, {createContext, useState} from 'react';
import {dark, light} from '../views/GlobalStyles';

export const GlobalContext = createContext({});

export function GlobalProvider({children}) {
  const [currentTheme, setCurrentTheme] = useState('light');

  const themes = {
    dark: dark,
    light: light,
  };

  const Theme = {
    currentTheme,
    setCurrentTheme,
    theme: themes[currentTheme],
  }

  return (
    <GlobalContext.Provider
      value={{
        Theme,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
