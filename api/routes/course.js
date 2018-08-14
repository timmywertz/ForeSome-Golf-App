const NodeHTTPError = require("node-http-error");
const { getCourses, getCourse } = require("../dal");
const bodyParser = require("body-parser");
const { not, pathOr } = require("ramda");

// {
//     _id: "course_patriots-point-links",
//     name: "Patriots Point Links",
//     type: "course",
//     phoneNumber: "(843) 881-0042",
//     location: "1 Patriots Point Road, Mt Pleasant, SC 29464",
//     address: {
//       street: "1 Patriots Point Road",
//       city: "Mt Pleasant",
//       state: "SC",
//       zip: "29464"
//     },
//     latitude: 32.7922,
//     longitude: 79.8953,
//     teeTimes: [
//       { time: "8:00 AM", isAvail: true },
//       { time: "8:10 AM", isAvail: true },
//       { time: "8:20 AM", isAvail: true },
//       { time: "8:30 AM", isAvail: true },
//       { time: "8:40 AM", isAvail: true },
//       { time: "8:50 AM", isAvail: true },
//       { time: "9:00 AM", isAvail: true },
//       { time: "9:10 AM", isAvail: true },
//       { time: "9:20 AM", isAvail: true },
//       { time: "9:30 AM", isAvail: true },
//       { time: "9:40 AM", isAvail: true },
//       { time: "9:50 AM", isAvail: true },
//       { time: "10:00 AM", isAvail: true },
//       { time: "10:10 AM", isAvail: true },
//       { time: "10:20 AM", isAvail: true },
//       { time: "10:30 AM", isAvail: true },
//       { time: "10:40 AM", isAvail: true },
//       { time: "10:50 AM", isAvail: true },
//       { time: "11:00 AM", isAvail: true },
//       { time: "11:10 AM", isAvail: true },
//       { time: "11:20 AM", isAvail: true },
//       { time: "11:30 AM", isAvail: true },
//       { time: "11:40 AM", isAvail: true },
//       { time: "11:50 AM", isAvail: true },
//       { time: "12:00 PM", isAvail: true },
//       { time: "12:10 PM", isAvail: true },
//       { time: "12:20 PM", isAvail: true },
//       { time: "12:30 PM", isAvail: true },
//       { time: "12:40 PM", isAvail: true },
//       { time: "12:50 PM", isAvail: true },
//       { time: "1:00 PM", isAvail: true },
//       { time: "1:10 PM", isAvail: true },
//       { time: "1:20 PM", isAvail: true },
//       { time: "1:30 PM", isAvail: true },
//       { time: "1:40 PM", isAvail: true },
//       { time: "1:50 PM", isAvail: true },
//       { time: "2:00 PM", isAvail: true },
//       { time: "2:10 PM", isAvail: true },
//       { time: "2:20 PM", isAvail: true },
//       { time: "2:30 PM", isAvail: true },
//       { time: "2:40 PM", isAvail: true },
//       { time: "2:50 PM", isAvail: true },
//       { time: "3:00 PM", isAvail: true },
//       { time: "3:10 PM", isAvail: true },
//       { time: "3:20 PM", isAvail: true },
//       { time: "3:30 PM", isAvail: true },
//       { time: "3:40 PM", isAvail: true },
//       { time: "3:50 PM", isAvail: true },
//       { time: "4:00 PM", isAvail: true },
//       { time: "4:10 PM", isAvail: true },
//       { time: "4:20 PM", isAvail: true },
//       { time: "4:30 PM", isAvail: true },
//       { time: "4:40 PM", isAvail: true },
//       { time: "4:50 PM", isAvail: true },
//       { time: "5:00 PM", isAvail: true }
//     ]
//   }

const reqFields = [
  "_id",
  "name",
  "type",
  "phoneNumber",
  "location",
  "address",
  "image",
  "latitude",
  "longitude",
  "teeTimes"
];

const allowedFields = [];

const courseRoutes = app => {
  app.get("/", (req, res) => res.send("Welcome to the ForeSome API"));
  app.get("/courses", (req, res, next) => {
    getCourses()
      .then(courses => res.status(200).send(courses))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err));
      });
  });
  app.get("/courses/:id", (req, res, next) => {
    const courseId = pathOr("", ["params", "id"], req);
    getCourse(courseId)
      .then(course => res.status(200).send(course))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err));
      });
  });
};

module.exports = courseRoutes;
