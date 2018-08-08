import { creatStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { courses, currentCourses } from "./reducers/courses";
import { golfers, currentGolfers } from "./reducers/golfers";
import { teeTimes } from "./reducers/teetimes";

const store = createStore(
  combineReducers({
    courses,
    currentCourses,
    golfers,
    currentGolfers,
    teeTimes
  }),
  applyMiddleware
);

export default store;
