import {
  NEW_GOLFER_FORM_CLEARED,
  NEW_GOLFER_FORM_SAVE_FAILED,
  NEW_GOLFER_FORM_SAVE_SUCCEEDED,
  NEW_GOLFER_FORM_SAVE_STARTED,
  NEW_GOLFER_FORM_UPDATED
} from "../constants";
import { merge, mergeDeepRight } from "ramda";

const newGolferInitialState = {
  data: {
    firstName: "",
    lastName: "",
    emailAddress: "",
    handicap: "",
    gender: ""
  },
  isError: false,
  isSaving: false,
  errorMsg: "",
  isAdded: false
};

export const newGolfer = (state = newGolferInitialState, action) => {
  switch (action.type) {
    case NEW_GOLFER_FORM_UPDATED:
      return mergeDeepRight(state, { data: action.payload });

    case NEW_GOLFER_FORM_SAVE_STARTED:
      return merge(state, { isError: false, isSaving: true, errorMsg: "" });
    case NEW_GOLFER_FORM_SAVE_FAILED:
      return merge(state, {
        isError: true,
        isSaving: false,
        errorMsg: action.payload
      });
    case NEW_GOLFER_FORM_SAVE_SUCCEEDED:
      return merge(state, { isAdded: true });
    case NEW_GOLFER_FORM_CLEARED:
      return newGolferInitialState;
    default:
      return state;
  }
};
