import {
  NEW_GOLFER_FORM_SAVE_STARTED,
  NEW_GOLFER_FORM_FAILED,
  NEW_GOLFER_FORM_SAVE_SUCCEEDED,
  NEW_GOLFER_FORM_SAVE_FAILED
} from "../constants";
import fetch from "isomorphic-fetch";

const url = process.env.REACT_APP_BASE_URL + "/golfers";

export const createNewGolfer = history => async (dispatch, getState) => {
  dispatch({ type: NEW_GOLFER_FORM_SAVE_STARTED });

  const newGolfer = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(getState().newGolfer.data)
  })
    .then(res => res.json())
    .then(saveResponse => {
      if (!saveResponse.ok) {
        dispatch({
          type: NEW_GOLFER_FORM_FAILED,
          payload: "Could not save the event."
        });
      } else {
        dispatch({ type: NEW_GOLFER_FORM_SAVE_SUCCEEDED });
        history.push("/");
      }
    })
    .catch(err =>
      dispatch({
        type: NEW_GOLFER_FORM_SAVE_FAILED,
        payload:
          "Unexpected error prevented us from saving the event. Please try again."
      })
    );
};
