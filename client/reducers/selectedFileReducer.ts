import { constants } from "../constants";
import { ActionType } from "../types";

export const selectedFilesReducer = (state = [], action: ActionType) => {
  switch (action.type) {
    case constants.SET_SELECTED_FILES:
      return (state = action.payload);
    default:
      return state;
  }
};
