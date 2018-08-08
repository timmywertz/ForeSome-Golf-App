import { SET_COURSES, GET_CURRENT_COURSES } from "../constants";

export const golfers = (state = [], action) => {
  switch (action.type) {
    case SET_COURSES:
      return action.payload;
    default:
      return state;
  }
};

export const currentGolfers = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_COURSES:
      return action.payload;
    default:
      return state;
  }
};
