import React, {createContext, useState} from 'react';

export const GlobalContext = createContext({});

export function GlobalProvider({children}) {
  const [save, setSave] = useState(false);
  const [destroy, setDestroy] = useState(false);
  const [archive, setArchive] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        save,
        setSave,
        destroy, 
        setDestroy,
        archive,
        setArchive,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
