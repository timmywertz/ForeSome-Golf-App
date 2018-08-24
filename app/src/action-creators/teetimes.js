import {
  GET_TEETIMES,
  SET_TEETIME,
  NEW_TEETIME_CREATED,
  NEW_TEETIME_SAVE_FAILED,
  NEW_TEETIME_SAVE_STARTED,
  NEW_TEETIME_SAVE_SUCCEEDED,
  TEETIME_JOIN_SAVE_STARTED,
  TEETIME_JOIN_SAVE_SUCCEEDED,
  TEETIME_JOIN_SAVE_FAILED
} from "../constants";
import fetch from "isomorphic-fetch";
const url = process.env.REACT_APP_BASE_URL + "/teetimes";

export const getTeeTimes = async (dispatch, getState) => {
  const teeTimes = await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
  console.log("calledgetTeeTimes", teeTimes);
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
    history.push("/teetime/new/thankyou");
  } else {
    dispatch({ type: NEW_TEETIME_SAVE_FAILED });
    alert("ERROR");
  }
};

export const joinTeeTime = history => async (dispatch, getState) => {
  console.log("calledjoinTeeTime");
  dispatch({ type: TEETIME_JOIN_SAVE_STARTED });

  const joinedTeeTime = {
    teeTimes: getState().teeTimes,
    groupSize: getState().teeTimes.groupSize
  };
  const teeTimeID = getState().teeTimes._id;

  const result = await fetch(`${url}/${teeTimeID}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(joinedTeeTime)
  })
    .then(res => res.json())
    .catch(err => dispatch({ type: TEETIME_JOIN_SAVE_FAILED }));
  console.log("RESULT", JSON.stringify(result));
  if (result.ok) {
    dispatch({ type: TEETIME_JOIN_SAVE_SUCCEEDED });
    getTeeTimes(dispatch, getState);
    history.push("/join/thankyou");
  } else {
    dispatch({ type: TEETIME_JOIN_SAVE_FAILED });
    alert("ERROR");
  }
};

// export const updateEvent = history => (dispatch, getState) => {
//   const updatedEvent = getState().editEvent.data;
//   const eventId = updatedEvent._id;

//   dispatch({ type: EDIT_EVENT_SAVE_STARTED });
//   fetch(`${url}/events/${eventId}`, {
//     headers: { "Content-Type": "application/json" },
//     method: "POST",
//     body: JSON.stringify(newEvent)
//   })
//     .then(res => res.json())
//     .then(saveResponse => {
//       if (!saveResponse.ok) {
//         dispatch({ type: EDIT_EVENT_SAVE_FAILED });
//       } else {
//         dispatch({ type: EDIT_EVENT_SAVE_SUCCEEDED });
//         history.push(`${url}/events/${eventId}/view`);
//       }
//     })
//     .catch(err =>
//       dispatch({
//         type: EDIT_EVENT_SAVE_FAILED,
//         payload: "Unexpected error prevented us from saving the event."
//       })
//     );
// };
