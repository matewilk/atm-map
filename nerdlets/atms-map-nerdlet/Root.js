import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import reducers from "./reducers";

export default ({ children, initialState = {} }) => {
  const store = createStore(reducers, initialState, applyMiddleware(ReduxThunk));

  store.subscribe(() => {
    console.log(store.getState())
  });

  return <Provider store={store}>{children}</Provider>;
};