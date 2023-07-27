import React, { createContext } from "react";
import { useState } from "react";

const AnimationsContext = createContext({ completed: false });

export const AnimationsProvider = ({ children }) => {
  const [completed, setCompleted] = useState(false);

  const toggleCompleted = (value) => {
    setCompleted(value);
  };

  return (
    <AnimationsContext.Provider
      value={{
        toggleCompleted,
        completed,
      }}
    >
      {children}
    </AnimationsContext.Provider>
  );
};

export default AnimationsContext;
