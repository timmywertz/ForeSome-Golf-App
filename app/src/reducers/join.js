import {
  COURSES_ACQURIED,
  TEETIME_DATE_JOINED,
  TEETIME_TIME_JOINED,
  TEETIME_WINDOW_JOINED
} from "../constants";
import { merge } from "ramda";

const now = new Date();
const month =
  now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
const stringDate = `${now.getFullYear()}-${month}-${now.getDate()}`;

const initialJoinTeeTimeState = {
  join: true, //if true, player is joining, if false, player is creating a new foursome
  currentCourse: {},
  courses: [],
  teeTimeWindow: [
    "8:00am - 10:00am",
    "9:00am - 11:00am",
    "10:00am - 12:00pm",
    "11:00am - 1:00pm",
    "12:00pm - 2:00pm",
    "1:00pm - 3:00pm",
    "2:00pm - 4:00pm",
    "3:00pm - 5:00pm"
  ],
  TeeTimeDate: stringDate,
  selectedTeeTimeWindow: "",
  teeTimeDateAndTime: {}, //{time: "some time", date: "some date"  }
  selectedTeeTime: "",
  join: false, //if true, player is joining, if false, player is creating a new foursome
  availableTeeTimes: [], //once you know window, players, and join/create, loop trhough currentCourse and save in here the available tee times
  teeTimeCreated: "", //{course, numberplayers, final_tee_time,etc....} basically all the info u will show in confirmation page
  groupSize: "Foursome",
  //selectedGroupSize: {}, //range 1-4,
  gender: "Both",
  //selectedGenderPreferences: {},
  hcpRangeOptions: [],
  hcpRange: "Any Ability",
  teeTime: {}
};

export const joinTeeTime = (state = initialJoinTeeTimeState, action) => {
  switch (action.type) {
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
      return merge(state, {
        selectedTeeTime: action.payload
      });

    case TEETIME_WINDOW_JOINED:
      console.log("state", state);
      console.log("in reducer TEETIME DATE SELECTED", action.payload);
      return merge(state, { selectedTeeTimeWindow: action.payload });

    default:
      return state;
  }
};
