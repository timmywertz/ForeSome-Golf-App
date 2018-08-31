import {
  GET_TEETIMES,
  // NEW_TEETIME_FORM_UPDATED,
  // NEW_TEETIME_SAVE_FAILED,
  // NEW_TEETIME_SAVE_STARTED,
  // NEW_TEETIME_SAVE_SUCCEEDED,
  // NEW_TEETIME_CLEARED,
  JOINED_TEETIME_TIME,
  JOINED_TEETIME_DATE,
  TEETIME_JOIN_BOOKED,
  COURSES_ACQUIRED,
  TEETIME_TIME_JOINED,
  TEETIME_JOIN_SAVE_STARTED,
  TEETIME_JOIN_SAVE_SUCCEEDED,
  TEETIME_JOIN_SAVE_FAILED,
  TEETIME_JOIN_CLEARED
} from "../constants";
import { find, merge, mergeDeepRight, propEq } from "ramda";

const initialTeeTimeState = {
  teeTimes: [],
  reservedTeeTime: {},
  joinedTeeTimeTime: {},
  // joinedTeeTimeDate: "",
  isError: false,
  isSaving: false,
  errMessage: "",
  isBooked: false
};

export const teeTimes = (state = initialTeeTimeState, action) => {
  switch (action.type) {
    case GET_TEETIMES:
      console.log("GET_TEETIMES", action.payload);
      return merge(state, { teeTimes: action.payload });
    case COURSES_ACQUIRED:
      console.log("COURSES_ACQUIRED", action.payload);
      return merge(state, { courses: action.payload });

    case JOINED_TEETIME_DATE:
      console.log("state", state);
      console.log("in reducer JOINED_TEETIME_DATE", action.payload);
      return merge(state, { teeTimeDate: action.payload });

    case JOINED_TEETIME_TIME:
      console.log("state", state);
      console.log("in reducer JOINED_TEETIME_TIME", action.payload);
      console.log("state.teetimes.teetimes", state.teeTimes);
      // const selectedTeeTime = teeTime => {
      //   if (course._id === action.payload) {
      //     return true
      //   }
      // }

      const teeTimeObj = teeTime => {
        find(
          teeTime => teeTime.teeTimes._id === action.payload,
          state.teeTimes.teeTimes
        );
      };

      console.log(teeTimeObj);

      console.log("in reducer JOINED_TEETIME_TIME", action.payload);
      console.log("in reducer teeTimeObj in teetimes");
      return merge(state, {
        joinedTeeTimeTime: action.payload
      });

    case TEETIME_JOIN_SAVE_STARTED:
      console.log("in reducer EETIME_JOIN_SAVE_STARTED", action.payload);
      return merge(state, { isSaving: true, isError: false, errMessage: "" });

    case TEETIME_JOIN_SAVE_SUCCEEDED:
      console.log("in reducer TEETIME_JOIN_SAVE_SUCCEEDED", action.payload);
      return merge(state, { isBooked: true });

    case TEETIME_JOIN_SAVE_FAILED:
      console.log("in reducer TEETIME_JOIN_SAVE_FAILED", action.payload);
      return merge(state, {
        isError: true,
        errMessage: "Failed to save new teetime to database",
        isSaving: false
      });

    case TEETIME_JOIN_CLEARED:
      return initialTeeTimeState;

    case TEETIME_JOIN_BOOKED:
      return merge(state, { isBooked: true });
    default:
      return state;
  }
};
