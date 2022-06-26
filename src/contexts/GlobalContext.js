import React, {createContext, useState} from 'react';

export const GlobalContext = createContext({});

export function GlobalProvider({children}) {
  const [save, setSave] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        save,
        setSave,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
