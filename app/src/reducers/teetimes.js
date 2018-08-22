import {
  GET_TEETIMES,
  NEW_TEETIME_FORM_UPDATED,
  NEW_TEETIME_SAVE_FAILED,
  NEW_TEETIME_SAVE_STARTED,
  NEW_TEETIME_SAVE_SUCCEEDED,
  NEW_TEETIME_CLEARED
} from "../constants";
import { merge, mergeDeepRight } from "ramda";

const initialTeeTimeState = {
  // {
  //     _id: "teetime_course_wild-dunes-harbor_2018-08-25T08:00",
  //     date: "2018-08-25",
  //     time: "8:00 AM",
  //     courseId: "course_wild-dunes-harbor",
  //     type: "teetime",
  //     hcpRange: {
  //       low: 0,
  //       high: 36
  //     },
  //     foursome: [
  //       {
  //         _id: "golfer_wertz_timmylwertz@gmail.com",
  //         type: "golfer",
  //         lastName: "Wertz",
  //         firstName: "Tim",
  //         handicap: 10,
  //         gender: "M",
  //         emailAddress: "timmylwertz@gmail.com"
  //       },
  //       {
  //         _id: "golfer_adkins_wkadki01@gmail.com",
  //         type: "golfer",
  //         lastName: "Adkins",
  //         firstName: "Will",
  //         handicap: 30,
  //         gender: "M",
  //         emailAddress: "wkadki01@gmail.com"
  //       },
  //       {
  //         _id: "golfer_estes_peternigelestes@gmail.com",
  //         type: "golfer",
  //         lastName: "Estes",
  //         firstName: "Peter",
  //         handicap: 30,
  //         gender: "M",
  //         emailAddress: "peternigelestes@gmail.com"
  //       },
  //       {
  //         _id: "golfer_malley_laurenymalley@gmail.com",
  //         type: "golfer",
  //         lastName: "Malley",
  //         firstName: "Lauren",
  //         handicap: 12,
  //         gender: "F",
  //         emailAddress: "laurenymalley@gmail.com"
  //       }
  //     ],
  //     primaryGolfer_id: "golfer_wertz_timmylwertz@gmail.com"
  //   }
};

export const teeTimes = (state = [], action) => {
  switch (action.type) {
    case GET_TEETIMES:
      return action.payload;
    default:
      return state;
  }
};

const initialNewTeeTime = {
  data: {
    _id: "",
    date: "",
    time: "",
    courseId: "",
    hcpRange: "",
    groupSize: "",
    gender: "",
    golfer_id: ""
  },
  isError: false,
  isSaving: false,
  errMessage: ""
};

export const newTeeTime = (state = initialNewTeeTime, action) => {
  switch (action.type) {
    case NEW_TEETIME_FORM_UPDATED:
      return mergeDeepRight(state, { data: action.payload });
    // case NEW_TEETIME_SAVE_FAILED:
    //   return merge(state, {
    //     isError: true,
    //     errMessage: "Failed to save new teetime to database",
    //     isSaving: false
    //   });
    case NEW_TEETIME_SAVE_STARTED:
      return merge(state, { isSaving: true, isError: false, errMessage: "" });
    // case NEW_TEETIME_SAVE_SUCCEEDED:
    // return initialNewTeeTime;
    case NEW_TEETIME_CLEARED:
      return initialNewTeeTime;
    default:
      return state;
  }
};
