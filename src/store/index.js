import { createContext, useReducer } from "react";

const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR": {
      return {
        ...state,
        error: action.payload.message,
      };
    }
    default:
      return state;
  }
};

const initialState = {
  error: null,
};

const ContextStore = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default ContextStore;
