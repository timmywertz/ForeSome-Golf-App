import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Component } from "react";
import { Link } from "react-router-dom";
import CourseSelector from "../components/coursepicker";
import Select from "../components/select";
import { map } from "ramda";
import { connect } from "react-redux";
import CourseCard from "../components/coursecard";
import { GET_CURRENT_COURSE } from "../constants";

const tempCourse = {
  _id: "course_the-ocean-couse-kiawah-island-golf-resort",
  name: "The Ocean Course, Kiawah Island Golf Resort",
  type: "course",
  phoneNumber: "(843) 768-2121",
  location: "1000 Ocean Course Drive, Johns Island, SC 29455",
  image: "oceancourse.jpg",
  address: {
    street: "1000 Ocean Course Drive",
    city: "Johns Island",
    state: "SC",
    zip: "29455"
  },
  latitude: 32.612,
  longitude: 80.0233,
  teeTimes: []
};

const styles = {
  card: {
    maxWidth: 354
  }
};

const li = course => <CourseSelector foo={course} />;

const Location = props => {
  //const { coursesFromState } = props;

  return (
    <div>
      <center>
        <Typography
          style={{ marginTop: 50, marginBottom: 30 }}
          variant="display1"
        >
          Select Your Golf Course
        </Typography>
        <CourseCard course={tempCourse} />
        <CourseSelector />
        {/* <ul>{map(li, coursesFromState)} </ul> */}
        <Button
          style={{ marginRight: 20, marginTop: 30, padding: 20 }}
          component={Link}
          to="/teetime/new/date"
          variant="contained"
          size="large"
          color="primary"
        >
          Go Back
        </Button>
        <Button
          component={Link}
          style={{ marginTop: 30, padding: 20 }}
          to="/teetime/new/friends"
          variant="contained"
          size="large"
          color="secondary"
        >
          NEXT
        </Button>
      </center>
    </div>
  );
};

const mapStateToProps = state => ({
  coursesFromState: state.courses,
  selectedValue: state.courses.selectedValue,
  name: state.courses.name,
  getCurrentCourse: state.getCurrentCourse
});
//1)
// const mapActionsToProps = dispatch => {
//   return {
//     selectedValue: name => event => {
//       dispatch({ type: GET_CURRENT_COURSE, payload: {<CourseCard />} })
//
//     },
//   }
// }
//2)
// const mapActionsToProps = dispatch => {
//   return {
//     getCurrentCourse: id => dispatch(getCurrentCourse(id))
//   };
// };
//3)
const mapActionsToProps = dispatch => {
  return {
    selectedValue: name => {
      dispatch({ type: GET_CURRENT_COURSE, payload: name });
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(withStyles(styles)(Location));
