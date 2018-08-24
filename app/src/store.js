import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { courses } from "./reducers/courses";
import { newGolfer } from "./reducers/golfers";
//import { newTeeTime } from "./reducers/teetimes";
import { teeTimes } from "./reducers/teetimes";

const store = createStore(
  combineReducers({
    courses,
    newGolfer,
    teeTimes
    // newTeeTime
    // currentCourse
    //joinTeeTime
  }),
  applyMiddleware(thunk)
);

export default store;
