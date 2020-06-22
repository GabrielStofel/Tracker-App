import React, { useReducer, Children } from "react";

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};

    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  // Provider -> Component that will make all of the data available to
  // everything else inside the application

  // Context -> The object that is used to get actual access to the data
  return { Context, Provider };
};
