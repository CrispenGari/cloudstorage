import { combineReducers } from "redux";
import { selectedFilesReducer } from "./selectedFileReducer";

export const rootReducers = combineReducers({
  selectedFiles: selectedFilesReducer,
});
