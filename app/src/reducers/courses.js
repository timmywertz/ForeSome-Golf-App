import {
  NEW_TEETIME_STARTED,
  TEETIME_JOINED,
  COURSES_ACQUIRED,
  GET_CURRENT_COURSE,
  CURRENT_COURSE_SELECTED,
  TEETIME_DATE_SELECTED,
  TEETIME_TIME_SELECTED,
  GROUP_SIZE_SELECTED,
  GENDER_SELECTED,
  HANDICAP_RANGE_SELECTED,
  NEW_TEETIME_CREATED,
  TEETIME_WINDOW_SELECTED
} from "../constants";
import { contains, find, filter, merge, propEq } from "ramda";

// {
//     _id: "course_patriots-point-links",
//     name: "Patriots Point Links",
//     type: "course",
//     phoneNumber: "(843) 881-0042",
//     location: "1 Patriots Point Road, Mt Pleasant, SC 29464",
//     image: "/courses-images/patriotspointlinks.jpg"
//     address: {
//       street: "1 Patriots Point Road",
//       city: "Mt Pleasant",
//       state: "SC",
//       zip: "29464"
//     },
//     latitude: 32.7922,
//     longitude: 79.8953,
//     teeTimes: []
//   }

//write a function that takes in TEETIME_TIME_SELECTED action.payload
//11:00am - 1:00pm
//returns two ints
//returns [11,1]
//if int is 1 <= x <= 6 add 12
//returns [11,13]

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
  var newString = timeString.replace(":", ".");
  var timeFloat = parseFloat(newString);
  if (timeFloat >= 1 && timeFloat <= 6) {
    timeFloat = timeFloat + 12;
  }
  return timeFloat;
};
//8:10am -> 8.10am -> 8.1

//function taht takes in times from teeTimes list and returns an int
//8:10am in
//8.1 out

//loop through state.currentCourse.teeTimes
//

const now = new Date();
const month =
  now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
const stringDate = `${now.getFullYear()}-${month}-${now.getDate()}`;

const initialCourseState = {
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

export const courses = (state = initialCourseState, action) => {
  switch (action.type) {
    case COURSES_ACQUIRED:
      console.log(action.payload);
      return merge(state, { courses: action.payload });

    case TEETIME_JOINED:
      console.log(action.payload);
      return merge(state, { join: true });

    case NEW_TEETIME_STARTED:
      console.log(action.payload);
      return merge(state, { join: action.payload });

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
      }); //action.payload

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
    default:
      return state;
  }
};

//do mapStatetoprops in teetime showing page
//access it with state.courses.availableTeeTimes
//display the times
//allow user to select one
//dispatch an action that send that time to reducer
