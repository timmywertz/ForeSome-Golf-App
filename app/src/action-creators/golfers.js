import {
  GET_GOLFERS,
  NEW_GOLFER_FORM_SAVE_STARTED,
  NEW_GOLFER_FORM_FAILED,
  NEW_GOLFER_FORM_SAVE_SUCCEEDED,
  NEW_GOLFER_FORM_SAVE_FAILED
} from "../constants";
import fetch from "isomorphic-fetch";

const url = process.env.REACT_APP_BASE_URL + "/golfers";

export const getGolfers = async (dispatch, getState) => {
  console.log("calledgetGolfers");
  const golfers = await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));

  dispatch({ type: GET_GOLFERS, payload: golfers });
};

export const createNewGolfer = history => async (dispatch, getState) => {
  console.log("calledcreateNewGolfer");
  dispatch({ type: NEW_GOLFER_FORM_SAVE_STARTED });

  const newGolfer = {
    firstName: getState().newGolfer.data.firstName,
    lastName: getState().newGolfer.data.lastName,
    emailAddress: getState().newGolfer.data.emailAddress,
    handicap: getState().newGolfer.handicap,
    gender: getState().newGolfer.gender,
    password: getState().newGolfer.password
  };

  const result = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(newGolfer)
  })
    .then(res => res.json())
    .catch(err => dispatch({ type: NEW_GOLFER_FORM_SAVE_FAILED }));
  console.log("RESULT", JSON.stringify(result));
  if (result.ok) {
    dispatch({ type: NEW_GOLFER_FORM_SAVE_SUCCEEDED });
    getGolfers(dispatch, getState);
    history.push("/menu");
  } else {
    dispatch({ type: NEW_GOLFER_FORM_SAVE_FAILED });
    alert("ERROR");
  }
};
