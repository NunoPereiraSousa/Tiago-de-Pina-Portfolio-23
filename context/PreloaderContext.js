import React, { createContext } from "react";
import { useState } from "react";

const PreloaderContext = createContext({ completed: true });

export const PreloaderProvider = ({ children }) => {
  const [completed, setCompleted] = useState(true);

  console.log("preloader time", completed);

  const toggleCompleted = (value) => {
    setCompleted(value);
  };

  return (
    <PreloaderContext.Provider
      value={{
        toggleCompleted,
        completed,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
};

export default PreloaderContext;
