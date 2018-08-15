import { SET_COURSES, GET_CURRENT_COURSE } from "../constants";
import { contains, merge } from "ramda";

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

const initialCourseState = {
  _id: "",
  name: "",
  type: "",
  phoneNumber: "",
  location: "",
  image: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: ""
  },
  latitude: "",
  longitude: "",
  teeTimes: []
};

export const courses = (state = [], action) => {
  switch (action.type) {
    case SET_COURSES:
      return action.payload;
    case GET_CURRENT_COURSE:
      return contains(action.payload, state._id);
    default:
      return state;
  }
};

// const initialCurrentCourse = {
//   name: "",
//   location: "",
//   phoneNumber: ""
// };

// export const currentCourse = (state = [], action) => {
//   switch (action.type) {
//     case GET_CURRENT_COURSE:
//       return merge(action.payload, state);
//     default:
//       return state;
//   }
// };
