const NodeHTTPError = require("node-http-error");
const {
  getTeeTimes,
  getTeeTime,
  addTeeTime,
  putTeeTime,
  joinTeeTime
} = require("../dal");
const bodyParser = require("body-parser");
const { isEmpty, not, pathOr, propOr } = require("ramda");
const checkRequiredFields = require("../lib/checkRequiredFields");
const cleanObj = require("../lib/cleanObj");
const missingFieldMsg = require("../lib/cleanObj");

const reqFields = [
  "_id",
  "type",
  "_rev",
  "teeTimeDate",
  "teeTimeCreated",
  "courseId",
  "hcpRange",
  "groupSize",
  "currentGolfers",
  "isFull",
  "gender",
  "golferId"
];

const allowedFields = [];

const teeTimeRoutes = app => {
  //app.get("/", (req, res) => res.send("Welcome to the ForeSome API"));
  app.get("/teetimes", (req, res, next) => {
    getTeeTimes()
      .then(teetimes => res.status(200).send(teetimes))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err));
      });
  });
  app.get("/teetimes/:id", (req, res, next) => {
    const teeTimeId = pathOr("", ["params", "id"], req);
    getTeeTime(teeTimeId)
      .then(teeTime => res.status(200).send(teeTime))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err));
      });
  });
  app.post("/teetimes", (req, res, next) => {
    const newTeeTime = propOr({}, "body", req);
    console.log(JSON.stringify(newTeeTime));

    const missingFields = checkRequiredFields(
      [
        "teeTimeDate",
        "teeTimeCreated",
        "courseId",
        "hcpRange",
        "groupSize",
        "currentGolfers",
        "isFull",
        "gender",
        "golferId"
      ],
      newTeeTime
    );

    if (not(isEmpty(missingFields))) {
      console.log("missingFields", missingFields);
      next(
        new NodeHTTPError(400, `missing the following fields: ${missingFields}`)
      );
    }
    const finalTeeTime = cleanObj(
      [
        "teeTimeDate",
        "teeTimeCreated",
        "courseId",
        "hcpRange",
        "groupSize",
        "currentGolfers",
        "isFull",
        "gender",
        "golferId"
      ],
      newTeeTime
    );
    addTeeTime(finalTeeTime)
      .then(addResult => {
        console.log("ADDRESULT", addResult);
        res.status(201).send(addResult);
      })
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err));
      });
  });
  app.put("/teetimes", (req, res, next) => {
    const joinedTeeTime = propOr({}, "body", req);

    const missingFields = checkRequiredFields(
      [
        "_id",
        "type",
        "_rev",
        "teeTimeDate",
        "teeTimeCreated",
        "courseId",
        "hcpRange",
        "groupSize",
        "currentGolfers",
        "isFull",
        "gender",
        "golferId"
      ],
      joinedTeeTime
    );

    if (not(isEmpty(missingFields))) {
      next(
        new NodeHTTPError(400, `missing the following fields: ${missingFields}`)
      );
    }
    const finalObj = cleanObj(
      [
        "_id",
        "type",
        "_rev",
        "teeTimeDate",
        "teeTimeCreated",
        "courseId",
        "hcpRange",
        "groupSize",
        "currentGolfers",
        "isFull",
        "gender",
        "golferId"
      ],
      joinedTeeTime
    );
    joinTeeTime(finalObj)
      .then(addResult => {
        console.log(addResult);
        res.status(201).send(addResult);
      })
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err));
      });
  });
};
module.exports = teeTimeRoutes;
