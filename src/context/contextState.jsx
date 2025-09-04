import React from "react";
import Context from "./context";
import { combineState } from "./combineState";

export const ContextState = ({ children }) => {
  const state = combineState();

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
