import { anyPass, filter, map, propEq, compose } from "ramda";

const filterCourses = (courses, teeTimes) => (dispatch, getState) => {
  const predicateFns = compose(
    map(propEq("_id")),
    map(t => t.courseId)
  )(teeTimes);

  console.log(
    "filter",
    filter(course => anyPass(predicateFns)(course), courses)
  );
  return filter(course => anyPass(predicateFns)(course), courses);
};

export default filterCourses;
