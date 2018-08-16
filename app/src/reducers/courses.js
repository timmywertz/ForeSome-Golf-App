import {
  SET_COURSES,
  GET_CURRENT_COURSE,
  CURRENT_COURSE_SELECTED,
  TEETIME_DATE_SELECTED,
  TEETIME_TIME_SELECTED,
  NEW_TEETIME_CREATED
} from "../constants";
import { contains, find, merge, propEq } from "ramda";

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
  teeTimeDate: stringDate,
  teeTimeDateAndTime: {}, //{time: "some time", date: "some date"  }
  join: true, //if true, player is joining, if false, player is creating a new foursome
  NumberPlayers: 1, //range 1-4,
  availableTeeTimes: {}, //once you know window, players, and join/create, loop trhough currentCourse and save in here the available tee times
  selectedTeeTime: {} //{course, numberplayers, final_tee_time,etc....} basically all the info u will show in confirmation page
};

export const courses = (state = initialCourseState, action) => {
  switch (action.type) {
    case SET_COURSES:
      console.log(action.payload);
      // return merge(state, { courses: action.payload });
      return merge(state, { courses: action.payload });
    case GET_CURRENT_COURSE:
      // console.log(state);
      // console.log("action.payload", action.payload);
      // let courseObj = {};
      // const courseName = action.payload;
      // for (let course of state.courses) {
      //   if (course.name === courseName) {
      //     courseObj = course;
      //   }
      // }
      // console.log(courseObj);
      //return find(propEq(`${action.payload}`, state.name))(state);
      return state;
    case CURRENT_COURSE_SELECTED:
      console.log(state);
      console.log("action.payload", action.payload);

      let courseObj = {};
      const courseName = action.payload;
      for (let course of state.courses) {
        if (course.name === courseName) {
          courseObj = course;
        }
      }
      console.log(courseObj);
      //return find(propEq(`${action.payload}`, state.name))(state);
      return { ...state, currentCourse: courseObj };
    case TEETIME_DATE_SELECTED:
      console.log("in reducer", action.payload);
      return merge(state, { teeTimeDate: action.payload });
    case TEETIME_TIME_SELECTED:
      return merge(state, { courses: action.payload });
    default:
      return state;
  }
};

// const initialCourseState = {
//   currentCourse: null,
//   courses: []
// };

// export const courses = (state = initialCourseState, action) => {
//   switch (action.type) {
//     case SET_COURSES:
//       return merge(state, { courses: action.payload });
//     case CURRENT_COURSE_SELECTED:
//       console.log(state);
//       console.log("action.payload", action.payload);
//       //return find(propEq(`${action.payload}`, state.name))(state);
//       return merge(state, { currentCourse: action.payload });
//     default:
//       return state;
//   }
// };

// export const currentCourse = (state = [], action) => {
//   switch (action.type) {
//     case GET_CURRENT_COURSE:
//       return merge(action.payload, state);
//     default:
//       return state;
//   }
// };
