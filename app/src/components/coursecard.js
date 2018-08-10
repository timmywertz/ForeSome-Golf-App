import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

function CourseCard(props) {
  const { classes, course } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={course.name}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {course.name}
          </Typography>
          <Typography component="p">{course.location}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

CourseCard.propTypes = {
  classes: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseCard);
