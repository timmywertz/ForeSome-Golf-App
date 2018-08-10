import { SET_COURSES, GET_CURRENT_COURSES } from "../constants";

const initialCourseState = {
  // {
  //     _id: "course_patriots-point-links",
  //     name: "Patriots Point Links",
  //     type: "course",
  //     phoneNumber: "(843) 881-0042",
  //     location: "1 Patriots Point Road, Mt Pleasant, SC 29464",
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
};

export const courses = (state = "I'm in state", action) => {
  switch (action.type) {
    case SET_COURSES:
      return action.payload;
    default:
      return state;
  }
};

export const currentCourses = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_COURSES:
      return action.payload;
    default:
      return state;
  }
};
