import React, { useState, useEffect, useContext, createContext } from "react";
import regeneratorRuntime from "regenerator-runtime";
import storage from "./Storage";

export const ValueContext = createContext(null);

export const ValueProvider = ({ value, children }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getData("sharedData", currentValue, setCurrentValue);
    getData("todos", [], setTodos);
  }, []);

  useEffect(() => {
    storeData("sharedData", currentValue);
  }, [currentValue]);

  useEffect(() => {
    storeData("todos", todos);
  }, [todos]);

  return (
    <ValueContext.Provider
      value={{ currentValue, setCurrentValue, todos, setTodos }}
    >
      {children}
    </ValueContext.Provider>
  );
};

const getData = async (key, initialValue, setter) => {
  try {
    storage
      .load({
        key,
        id: "1",
      })
      .then((ret) => {
        if (ret == undefined) {
          storeData(key, initialValue);
        } else {
          setter(ret);
        }
      })
      .catch((err) => {
        switch (err.name) {
          case "NotFoundError":
            storeData(key, initialValue);
            break;
          case "ExpiredError":
            console.log("ExpiredError");
            break;
        }
      });
  } catch (e) {
    console.log("error in getData ", e);
  }
};

const storeData = async (key, value) => {
  try {
    await storage.save({
      key,
      id: "1",
      data: value,
      expires: null,
    });
  } catch (e) {
    console.log("error in storeData ", e);
  }
};

export default ValueProvider;
export const useValue = () => useContext(ValueContext);
