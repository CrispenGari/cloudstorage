import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducers } from "../reducers";

const store = createStore(rootReducers);
const ReduxProvider: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
