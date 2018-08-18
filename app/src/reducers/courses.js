import {
  SET_COURSES,
  GET_CURRENT_COURSE,
  CURRENT_COURSE_SELECTED,
  TEETIME_DATE_SELECTED,
  TEETIME_TIME_SELECTED,
  GROUP_SIZE_SELECTED,
  GENDER_SELECTED,
  HANDICAP_RANGE_SELECTED,
  NEW_TEETIME_CREATED
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
  selectedTeeTimeDate: stringDate,
  teeTimeDateAndTime: {}, //{time: "some time", date: "some date"  }
  join: false, //if true, player is joining, if false, player is creating a new foursome
  availableTeeTimes: {}, //once you know window, players, and join/create, loop trhough currentCourse and save in here the available tee times
  selectedTeeTime: {}, //{course, numberplayers, final_tee_time,etc....} basically all the info u will show in confirmation page
  groupSize: "foursome",
  //selectedGroupSize: {}, //range 1-4,
  gender: "both",
  //selectedGenderPreferences: {},
  hcpRangeOptions: [],
  // [
  //   "10 and Lower",
  //   "5 - 15",
  //   "10 - 20",
  //   "15 - 25",
  //   "25 and Above",
  //   "Any Ability"
  // ],
  hcpRange: "any"
};

export const courses = (state = initialCourseState, action) => {
  switch (action.type) {
    case SET_COURSES:
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
      // return merge(state, {
      //   courses: find(course => course.name === action.payload, state.courses)
      // });
      //find(courseName => course.name === action.payload, state.CURRENT_COURSE_SELECTED)

      //return find(propEq(`${action.payload}`, state.name))(state);
      return merge(state, { currentCourse: courseObj });
    case TEETIME_DATE_SELECTED:
      console.log("in reducer TEETIME DATE SELECTED", action.payload);
      console.log("state", state);
      return merge(state, { teeTimeDate: action.payload });
    case TEETIME_TIME_SELECTED:
      console.log("inReducerTEETIMESELECTED", action.payload);
      console.log("stateTEETIMESELECT", state);
      return merge(state, { selectedTeeTime: action.payload });
    case GROUP_SIZE_SELECTED:
      console.log("GROUP_SIZE_SELECTED action.payload", action.payload);
      console.log("stateGroupSizeReducer", state);
      // return merge(state, { selectedGroupSize: action.payload });
      return merge(state, { groupSize: action.payload });
    case GENDER_SELECTED:
      console.log("GENDER_SELECTED", action.payload);
      return merge(state, { gender: action.payload });
    case HANDICAP_RANGE_SELECTED:
      console.log("HANDICAP_RANGE_REDUCER", action.payload);
      return merge(state, { hcpRange: action.payload });

    default:
      return state;
  }
};
