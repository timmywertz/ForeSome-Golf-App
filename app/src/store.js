import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { courses, currentCourses } from "./reducers/courses";
//import { golfers, currentGolfers } from "./reducers/golfers";
//import { teeTimes } from "./reducers/teetimes";

const store = createStore(
  combineReducers({
    courses,
    currentCourses
  }),
  applyMiddleware(thunk)
);

export default store;
