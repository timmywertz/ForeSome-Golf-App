import {
  GET_TEETIMES,
  // NEW_TEETIME_FORM_UPDATED,
  // NEW_TEETIME_SAVE_FAILED,
  // NEW_TEETIME_SAVE_STARTED,
  // NEW_TEETIME_SAVE_SUCCEEDED,
  // NEW_TEETIME_CLEARED,
  TEETIME_DATE_JOINED,
  TEETIME_JOIN_BOOKED,
  COURSES_ACQUIRED,
  TEETIME_TIME_JOINED,
  TEETIME_JOIN_SAVE_STARTED,
  TEETIME_JOIN_SAVE_SUCCEEDED,
  TEETIME_JOIN_SAVE_FAILED,
  TEETIME_JOIN_CLEARED
} from "../constants";
import { filter, merge, mergeDeepRight } from "ramda";
import filterCourses from "../lib/joinCoursesHelper";

const initialTeeTimeState = {
  teeTimes: [],
  data: {
    _id: "",
    date: "",
    time: "",
    courseId: "",
    hcpRange: "",
    groupSize: "",
    gender: "",
    golfer_id: ""
  },
  selectedTeeTime: {
    groupSize: "",
    gender: "",
    hcpRange: "",
    date: "",
    time: ""
  },
  isError: false,
  isSaving: false,
  errMessage: "",
  isBooked: false
};

export const teeTimes = (state = initialTeeTimeState, action) => {
  switch (action.type) {
    case GET_TEETIMES:
      return action.payload;
    case COURSES_ACQUIRED:
      console.log(action.payload);
      return merge(state, { courses: action.payload });

    case TEETIME_DATE_JOINED:
      console.log("state", state);
      console.log("in reducer TEETIME DATE SELECTED", action.payload);
      return merge(state, { teeTimeDate: action.payload });

    case TEETIME_TIME_JOINED:
      console.log("state", state);
      console.log("in reducer TEETIME DATE SELECTED", action.payload);
      return mergeDeepRight(state, {
        selectedTeeTime: action.payload
      });

    // case TEETIME_WINDOW_JOINED:
    //   console.log("state", state);
    //   console.log("in reducer TEETIME DATE SELECTED", action.payload);
    //   return merge(state, { selectedTeeTimeWindow: action.payload });

    case TEETIME_JOIN_SAVE_STARTED:
      return merge(state, { isSaving: true, isError: false, errMessage: "" });

    case TEETIME_JOIN_SAVE_SUCCEEDED:
      return merge(state, { isBooked: true });

    case TEETIME_JOIN_SAVE_FAILED:
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

// const initialNewTeeTime = {
//   data: {
//     _id: "",
//     date: "",
//     time: "",
//     courseId: "",
//     hcpRange: "",
//     groupSize: "",
//     gender: "",
//     golfer_id: ""
//   },
//   isError: false,
//   isSaving: false,
//   errMessage: ""
// };

// export const newTeeTime = (state = initialNewTeeTime, action) => {
//   switch (action.type) {
//     case NEW_TEETIME_FORM_UPDATED:
//       return mergeDeepRight(state, { data: action.payload });
//     // case NEW_TEETIME_SAVE_FAILED:
//     //   return merge(state, {
//     //     isError: true,
//     //     errMessage: "Failed to save new teetime to database",
//     //     isSaving: false
//     //   });
//     case NEW_TEETIME_SAVE_STARTED:
//       return merge(state, { isSaving: true, isError: false, errMessage: "" });
//     // case NEW_TEETIME_SAVE_SUCCEEDED:
//     // return initialNewTeeTime;
//     case NEW_TEETIME_CLEARED:
//       return initialNewTeeTime;
//     default:
//       return state;
//   }
// };
