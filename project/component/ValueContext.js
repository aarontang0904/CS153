import React, { useState, useContext, createContext } from "react";

export const ValueContext = createContext(null);

export const ValueProvider = ({ value, children }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [todos, setTodos] = useState([]);

  return (
    <ValueContext.Provider
      value={{ currentValue, setCurrentValue, todos, setTodos }}
    >
      {children}
    </ValueContext.Provider>
  );
};
export default ValueProvider;
export const useValue = () => useContext(ValueContext);
