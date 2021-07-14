import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { FinalCartsReducer } from "./FinalCartsReducer";
import { OriginalCartsReducer } from "./OriginalCartReducer";

const rootReducer = combineReducers({
  OriginalCart: OriginalCartsReducer,
  FinalCart: FinalCartsReducer,
});

export const ConfigureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk)); //removed redux-logger, run "yarn add redux-logger" to add
  return { store };
};
