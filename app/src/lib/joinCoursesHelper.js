import { anyPass, filter, map, propEq, compose } from "ramda";

const filterCourses = courses => (dispatch, getState) => {
  const teeTimes = getState().courses.teeTimes;

  const predicateFns = compose(
    map(propEq("_id")),
    map(t => t.courseId)
  )(teeTimes);

  return filter(course => anyPass(predicateFns)(course), courses);
};

export default filterCourses;
