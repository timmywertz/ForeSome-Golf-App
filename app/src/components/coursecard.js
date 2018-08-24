import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { isEmpty } from "ramda";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

// {
//     _id: "course_the-ocean-couse-kiawah-island-golf-resort",
//     name: "The Ocean Course, Kiawah Island Golf Resort",
//     type: "course",
//     phoneNumber: "(843) 768-2121",
//     location: "1000 Ocean Course Drive, Johns Island, SC 29455",
//     image: "/oceancourse.jpg",
//     address: {
//       street: "1000 Ocean Course Drive",
//       city: "Johns Island",
//       state: "SC",
//       zip: "29455"
//     },
//     latitude: 32.612,
//     longitude: 80.0233,
//     teeTimes: [],
//      img: "course1kiawia.png"
//   },

const NoCourseSelected = () => <div />;

function CourseCard(props) {
  const { classes, course, currentCourse } = props;
  return (
    <div>
      {isEmpty(props.currentCourse) ? (
        <NoCourseSelected />
      ) : (
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={`/course-images/${currentCourse.image}`}
            title={currentCourse.name}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {currentCourse.name}
            </Typography>
            <Typography component="p">{currentCourse.location}</Typography>
            <Typography component="p">{currentCourse.phoneNumber}</Typography>
          </CardContent>
          <CardActions />
        </Card>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  courses: state.courses.courses,
  currentCourse: state.courses.currentCourse,
  selectedValue: state.courses.selectedValue
});

const connector = connect(mapStateToProps);

export default connector(withStyles(styles)(CourseCard));
