import React, {createContext, useEffect, useState} from 'react';
import { configureEverything } from '../util/config';

export const GlobalContext = createContext({});

export function GlobalProvider({children}) {
  const [save, setSave] = useState(false);
  const [destroy, setDestroy] = useState(false);
  const [archive, setArchive] = useState(false);
  const [eye, setEye] = useState(true);

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
        eye,
        setEye,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
