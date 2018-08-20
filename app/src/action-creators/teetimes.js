import { GET_TEETIMES, NEW_TEETIME_CREATED } from "../constants";
import fetch from "isomorphic-fetch";
const url = process.env.REACT_APP_BASE_URL + "/teetimes";

export const getTeeTimes = async (dispatch, getState) => {
  console.log("calledgetTeeTimes");
  const teeTimes = await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));

  dispatch({ type: GET_TEETIMES, payload: teeTimes });
};

export const addTeeTime = (teeTime, history) => (dispatch, getState) => {
  const headers = { "Content-Type": "application/json" };
  const method = "POST";
  const body = JSON.stringify(teeTime);

  const result = fetch(url, {
    headers,
    method,
    body
  }).then(res => res.json());
  if (result.ok) {
    dispatch(getTeeTimes);
    history.push("/teetimes");
  } else {
    console.log("ERROR");
  }
};

// export const joinTeeTime = (field, value) => (dispatch, getState) => {
//   dispatch({type: TEETIME_JOINED, payload: {[field]: value}})
// }
