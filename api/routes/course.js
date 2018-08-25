const NodeHTTPError = require("node-http-error");
const { getCourses, getCourse } = require("../dal");
const { pathOr } = require("ramda");

const reqFields = [
  "_id",
  "name",
  "type",
  "phoneNumber",
  "location",
  "image",
  "address",
  "latitude",
  "longitude",
  "teeTimeWindow",
  "teeTimes"
];

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
