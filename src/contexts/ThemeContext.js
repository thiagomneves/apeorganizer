import React, {createContext, useEffect, useState} from 'react';
import { getConfig } from '../services/Config';
import {dark, light} from '../views/GlobalStyles';

export const ThemeContext = createContext({});

export function ThemeProvider({children}) {
  const [currentTheme, setCurrentTheme] = useState('light');
  useEffect(() => {
    getSavedTheme()
  }, [])
  
  async function getSavedTheme() {
    const config = {
      title: 'theme',
    }
    const alreadySaved = await getConfig(config);
    if (!!alreadySaved.length) {
      setCurrentTheme(alreadySaved[0].configset);
    }
  }

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
