import {
  GET_TEETIMES,
  NEW_TEETIME_CREATED,
  NEW_TEETIME_SAVE_FAILED,
  NEW_TEETIME_SAVED,
  NEW_TEETIME_SAVE_SUCCEEDED
} from "../constants";
import fetch from "isomorphic-fetch";
const url = process.env.REACT_APP_BASE_URL + "/teetimes";

export const getTeeTimes = async (dispatch, getState) => {
  console.log("calledgetTeeTimes");
  const teeTimes = await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));

  dispatch({ type: GET_TEETIMES, payload: teeTimes });
};

export const addTeeTime = (teeTime, history) => async (dispatch, getState) => {
  dispatch({ type: NEW_TEETIME_SAVED });

  const result = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(getState().newTeeTime.data)
  })
    .then(res => res.json())
    .catch(err => dispatch({ type: NEW_TEETIME_SAVE_FAILED }));
  if (result.ok) {
    dispatch({ type: NEW_TEETIME_SAVE_SUCCEEDED });
    getTeeTimes(dispatch, getState);
    history.push("/teetimes");
  } else {
    dispatch({ NEW_TEETIME_SAVE_FAILED });
  }
};

// export const joinTeeTime = (field, value) => (dispatch, getState) => {
//   dispatch({type: TEETIME_JOINED, payload: {[field]: value}})
// }
