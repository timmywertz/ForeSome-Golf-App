import { SET_COURSES, GET_CURRENT_COURSES } from "../constants";
import fetch from "isomorphic-fetch";
const url = process.env.REACT_APP_BASE_URL + "/courses";

export const getCourses = async (dispatch, getState) => {
  const courses = await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));

  dispatch({ type: SET_COURSES, payload: courses });
};
