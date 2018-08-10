import { SET_COURSES, GET_CURRENT_COURSES } from "../constants";

const initialGolferState = {
  // {
  //     _id: "golfer_wertz_timmylwertz@gmail.com",
  //     type: "golfer",
  //     lastName: "Wertz",
  //     firstName: "Tim",
  //     handicap: 10,
  //     gender: "M",
  //     emailAddress: "timmylwertz@gmail.com"
  //   },
};

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
