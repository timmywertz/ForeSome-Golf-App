import { SET_COURSES, GET_CURRENT_COURSE } from "../constants";
import fetch from "isomorphic-fetch";
const url = process.env.REACT_APP_BASE_URL + "/courses";

export const getCourses = async (dispatch, getState) => {
  console.log("calledgetCourses");
  const courses = await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));

  dispatch({ type: SET_COURSES, payload: courses });
};

// export const getCurrentCourse = id => (dispatch, getState) => {
//   console.log("calledgetCurrentCourse");
//   // const course = await fetch(url + "/" + id)
//   //   .then(res => res.json())
//   //   .catch(err => console.log(err));

//   dispatch({ type: GET_CURRENT_COURSE, payload: id });
// };
