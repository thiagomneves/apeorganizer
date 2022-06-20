import React, {createContext, useState} from 'react';

export const SaveContext = createContext({});

export function SaveProvider({children}) {
  const [save, setSave] = useState(false);

  return (
    <SaveContext.Provider
      value={{
        save,
        setSave,
      }}>
      {children}
    </SaveContext.Provider>
  );
}
