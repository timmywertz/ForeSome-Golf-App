import {
  GET_TEETIMES,
  SET_TEETIME,
  NEW_TEETIME_CREATED,
  NEW_TEETIME_SAVE_FAILED,
  NEW_TEETIME_SAVE_STARTED,
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

export const setTeeTime = id => async (dispatch, getState) => {
  const teeTime = await fetch(url + `/` + id)
    .then(res => res.json())
    .catch(err => console.log(err));

  dispatch({ type: SET_TEETIME, payload: teeTime });
};

export const addTeeTime = history => async (dispatch, getState) => {
  console.log("calledgetTeeTimes");
  dispatch({ type: NEW_TEETIME_SAVE_STARTED });

  const newTeeTime = {
    courseId: getState().courses.currentCourse._id,
    teeTimeDate: getState().courses.teeTimeDate,
    teeTimeCreated: getState().courses.teeTimeCreated,
    groupSize: getState().courses.groupSize,
    hcpRange: getState().courses.hcpRange,
    gender: getState().courses.gender,
    currentGolfers: getState().courses.currentGolfers,
    golferId: getState().courses.golferId,
    isFull: getState().courses.isFull
  };

  const result = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(newTeeTime)
  })
    .then(res => res.json())
    .catch(err => dispatch({ type: NEW_TEETIME_SAVE_FAILED }));
  console.log("RESULT", JSON.stringify(result));
  if (result.ok) {
    dispatch({ type: NEW_TEETIME_SAVE_SUCCEEDED });
    getTeeTimes(dispatch, getState);
    history.push("/thankyou");
  } else {
    dispatch({ type: NEW_TEETIME_SAVE_FAILED });
    alert("ERROR");
  }
};

// export const joinTeeTime = (field, value) => (dispatch, getState) => {
//   dispatch({type: TEETIME_JOINED, payload: {[field]: value}})
// }
