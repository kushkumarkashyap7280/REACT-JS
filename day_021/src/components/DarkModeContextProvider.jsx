import React, { createContext, useState } from 'react'
import { useEffect } from 'react';

const DarkModeContext = createContext();

export { DarkModeContext };

function DarkModeContextProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#ffffff';
    document.body.style.color = isDarkMode ? '#ffffff' : '#000000';
    document.body.style.transition = 'all 0.3s ease';
  }, [isDarkMode])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export default DarkModeContextProvider 