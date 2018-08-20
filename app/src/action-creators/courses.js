import { COURSES_ACQUIRED, GET_CURRENT_COURSE } from "../constants";
import fetch from "isomorphic-fetch";
const url = process.env.REACT_APP_BASE_URL + "/courses";

export const getCourses = async (dispatch, getState) => {
  console.log("calledgetCourses");
  const courses = await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));

  dispatch({ type: COURSES_ACQUIRED, payload: courses });
};
