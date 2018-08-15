import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { courses } from "./reducers/courses";
//import { golfers, currentGolfers } from "./reducers/golfers";
//import { teeTimes } from "./reducers/teetimes";

const store = createStore(
  combineReducers({
    courses
    // currentCourse
  }),
  applyMiddleware(thunk)
);

export default store;
