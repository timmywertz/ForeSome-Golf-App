import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { courses } from "./reducers/courses";
import { newGolfer } from "./reducers/golfers";
//import { teeTimes } from "./reducers/teetimes";

const store = createStore(
  combineReducers({
    courses,
    newGolfer
    // currentCourse
  }),
  applyMiddleware(thunk)
);

export default store;
