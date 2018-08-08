import { SET_TEETIMES } from "../constants";
import { merge } from "ramda";

export const teeTimes = (state = [], action) => {
  switch (action.type) {
    case SET_TEETIMES:
      return action.payload;
    default:
      return state;
  }
};

const initialTeeTime = {};
