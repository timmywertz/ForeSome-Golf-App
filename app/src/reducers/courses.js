import {
  NEW_TEETIME_BOOKED,
  COURSES_ACQUIRED,
  GET_CURRENT_COURSE,
  CURRENT_COURSE_SELECTED,
  TEETIME_DATE_SELECTED,
  TEETIME_TIME_SELECTED,
  GROUP_SIZE_SELECTED,
  GENDER_SELECTED,
  HANDICAP_RANGE_SELECTED,
  NEW_TEETIME_CREATED,
  TEETIME_WINDOW_SELECTED,
  TEETIME_DATE_JOINED,
  TEETIME_TIME_JOINED,
  TEETIME_WINDOW_JOINED,
  NEW_TEETIME_SAVE_SUCCEEDED,
  NEW_TEETIME_SAVE_FAILED,
  NEW_TEETIME_CLEARED,
  NEW_TEETIME_SAVE_STARTED,
  NEW_TEETIME_FORM_UPDATED
} from "../constants";
import { find, merge } from "ramda";

const timeToNumber = timeRangeString => {
  var stringSplit = timeRangeString.split("-");
  var startTime = parseInt(stringSplit[0]);
  var endTime = parseInt(stringSplit[1]);
  if (startTime >= 1 && startTime <= 6) {
    startTime = startTime + 12;
  }
  if (endTime >= 1 && endTime <= 6) {
    endTime = endTime + 12;
  }
  return [startTime, endTime];
};

const timeToFloat = timeString => {
  let newString = timeString.replace(":", ".");
  let timeFloat = parseFloat(newString);
  if (timeFloat >= 1 && timeFloat <= 6) {
    timeFloat = timeFloat + 12;
  }
  return timeFloat;
};

const now = new Date();
const month =
  now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
const stringDate = `${now.getFullYear()}-${month}-${now.getDate()}`;

const initialCourseState = {
  join: true,
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
  teeTimeDateAndTime: {},
  selectedTeeTime: "",
  selectedValue: "",
  join: false,
  teeTimeCreated: "",
  currentGolfers: 1,
  gender: "Both",
  golferId: "",
  hcpRangeOptions: [],
  hcpRange: "Any Ability",
  teeTime: {},
  isError: false,
  isSaving: false,
  errMessage: "",
  isBooked: false,
  isFull: false
};

export const courses = (state = initialCourseState, action) => {
  switch (action.type) {
    case COURSES_ACQUIRED:
      console.log(action.payload);
      return merge(state, { courses: action.payload });

    case GET_CURRENT_COURSE:
      return state;

    case CURRENT_COURSE_SELECTED:
      console.log(state);
      console.log("action.payload", action.payload);

      const selectedCourse = course => {
        if (course.name === action.payload) {
          return true;
        }
      };

      const courseObj = find(selectedCourse, state.courses);

      console.log("courseObj", courseObj);
      return merge(state, { currentCourse: courseObj });

    case TEETIME_DATE_JOINED:
      console.log("state", state);
      console.log("in reducer TEETIME DATE SELECTED", action.payload);
      return merge(state, { teeTimeDate: action.payload });

    case TEETIME_TIME_JOINED:
      console.log("inReducerTEETIMESELECTED", action.payload);
      console.log("stateTEETIMESELECT", state);
      console.log(timeToNumber(action.payload));

      return merge(state, {
        selectedTeeTime: action.payload,
        availableTeeTimes: availableTeeTimes
      });

    case TEETIME_WINDOW_JOINED:
      console.log("state", state);
      console.log("in reducer TEETIME DATE SELECTED", action.payload);
      return merge(state, { selectedTeeTimeWindow: action.payload });

    case TEETIME_WINDOW_SELECTED:
      return merge(state, { selectedTeeTimeWindow: action.payload });

    case TEETIME_DATE_SELECTED:
      console.log("in reducer TEETIME DATE SELECTED", action.payload);
      console.log("state", state);
      const teeTimes = state.currentCourse.teeTimes;
      console.log(teeTimes);
      return merge(state, { teeTimeDate: action.payload });

    case TEETIME_TIME_SELECTED:
      console.log("inReducerTEETIMESELECTED", action.payload);
      console.log("stateTEETIMESELECT", state);
      console.log(timeToNumber(action.payload));
      const teeTimeRange = timeToNumber(action.payload);
      let availableTeeTimes = [];
      for (let teeTime of state.currentCourse.teeTimes) {
        const time = timeToFloat(teeTime.time);
        if (
          teeTime.isAvail === true &&
          time >= teeTimeRange[0] &&
          time <= teeTimeRange[1]
        ) {
          availableTeeTimes.push(teeTime);
        }
      }
      console.log("availableTeeTimes", availableTeeTimes);
      return merge(state, {
        selectedTeeTime: timeToNumber(action.payload),
        availableTeeTimes: availableTeeTimes
      });

    case GROUP_SIZE_SELECTED:
      console.log("GROUP_SIZE_SELECTED action.payload", action.payload);
      console.log("stateGroupSizeReducer", state);
      return merge(state, { groupSize: action.payload });
    case GENDER_SELECTED:
      console.log("GENDER_SELECTED", action.payload);
      return merge(state, { gender: action.payload });
    case HANDICAP_RANGE_SELECTED:
      console.log("HANDICAP_RANGE_REDUCER", action.payload);
      return merge(state, { hcpRange: action.payload });

    case NEW_TEETIME_CREATED:
      console.log("NEW_TEETIME_SELECTED", action.payload);
      console.log("NEW_TEETIME_STATE", state);
      return merge(state, { teeTimeCreated: action.payload });

    case NEW_TEETIME_FORM_UPDATED:
      return merge(state, action.payload);

    case NEW_TEETIME_SAVE_STARTED:
      return merge(state, { isSaving: true, isError: false, errMessage: "" });

    case NEW_TEETIME_SAVE_SUCCEEDED:
      return merge(state, { isBooked: true });

    case NEW_TEETIME_SAVE_FAILED:
      return merge(state, {
        isError: true,
        errMessage: "Failed to save new teetime to database",
        isSaving: false
      });

    case NEW_TEETIME_CLEARED:
      return initialCourseState;

    case NEW_TEETIME_BOOKED:
      return merge(state, { isBooked: true });

    default:
      return state;
  }
};
