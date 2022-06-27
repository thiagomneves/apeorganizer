import React, {createContext, useEffect, useState} from 'react';
import { configureEverything } from '../util/config';

export const GlobalContext = createContext({});

export function GlobalProvider({children}) {
  const [save, setSave] = useState(false);
  const [destroy, setDestroy] = useState(false);
  const [archive, setArchive] = useState(false);

  useEffect(() => {
    configureEverything();
  }, [])

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
