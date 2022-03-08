import { constants } from "../constants";

export const setSelectedFiles = (payload: any[]) => {
  return {
    payload,
    type: constants.SET_SELECTED_FILES,
  };
};
