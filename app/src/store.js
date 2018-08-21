import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { courses } from "./reducers/courses";
import { newGolfer } from "./reducers/golfers";
// import { joinTeeTime } from "./reducers/join";

const store = createStore(
  combineReducers({
    courses,
    newGolfer
    // joinTeeTime
    // currentCourse
  }),
  applyMiddleware(thunk)
);

export default store;
