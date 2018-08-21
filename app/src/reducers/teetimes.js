import {
  SET_TEETIMES,
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
    case SET_TEETIMES:
      return action.payload;
    default:
      return state;
  }
};

const initialNewTeeTime = {
  data: {
    name: "",
    shortDesc: "",
    desc: "",
    icon: ""
  },
  isError: false,
  isSaving: false,
  errMessage: ""
};
export const newCategory = (state = initialNewCategory, action) => {
  switch (action.type) {
    case NEW_CATEGORY_SAVE_FAILED:
      return merge(state, {
        isError: true,
        errMessage: "Failed to save new category to database",
        isSaving: false
      });
    case NEW_CATEGORY_SAVE_STARTED:
      return merge(state, { isSaving: true, isError: false, errMessage: "" });
    case NEW_CATEGORY_SAVE_SUCCEEDED:
      return initialNewCategory;
    case NEW_CATEGORY_FORM_UPDATED:
      return mergeDeepRight(state, { data: action.payload });
    case NEW_CATEGORY_CLEARED:
      return initialNewCategory;
    default:
      return state;
  }
};

// export const newTeeTime = (state = newInitialTeeTimeState, action) => {
//   switch (action.type) {
//     case NEW_TEETIME_FORM_UPDATED:
//       return mergeDeepRight(state, { data: action.payload });
//     case NEW_TEETIME_SAVE_FAILED:
//       return merge(state, {
//         isError: true,
//         isSaving: false,
//         errorMsg: action.payload
//       });
//     case NEW_TEETIME_SAVE_STARTED:
//       return merge(state, {
//         isError: false,
//         isSaving: true,
//         errorMsg: ""
//       });
//     case NEW_TEETIME_SAVE_SUCCEEDED:
//       return newInitialTeeTimeState;
//     case NEW_TEETIME_CLEARED:
//       return newInitialTeeTimeState;
//     default:
//       return state;
//   }
// };
