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

// const {
//   getResources,
//   getResource,
//   postResource,
//   putResource,
//   deleteResource
// } = require("../dal")
// const { propOr, isEmpty, not, concat, pathOr } = require("ramda")
// const missingFieldMsg = require("../lib/missingFieldMsg")

// {
//     _id: "teetime_course_wild-dunes-harbor_2018-08-25T08:00",
//     date: "2018-08-25",
//     time: "8:00 AM",
//     courseId: "course_wild-dunes-harbor",
//     type: "teetime",
//     hcpRange: {
//       low: 0,
//       high: 36
//     },
//     foursome: [
//       {
//         _id: "golfer_wertz_timmylwertz@gmail.com",
//         type: "golfer",
//         lastName: "Wertz",
//         firstName: "Tim",
//         handicap: 10,
//         gender: "M",
//         emailAddress: "timmylwertz@gmail.com"
//       },
//       {
//         _id: "golfer_adkins_wkadki01@gmail.com",
//         type: "golfer",
//         lastName: "Adkins",
//         firstName: "Will",
//         handicap: 30,
//         gender: "M",
//         emailAddress: "wkadki01@gmail.com"
//       },
//       {
//         _id: "golfer_estes_peternigelestes@gmail.com",
//         type: "golfer",
//         lastName: "Estes",
//         firstName: "Peter",
//         handicap: 30,
//         gender: "M",
//         emailAddress: "peternigelestes@gmail.com"
//       },
//       {
//         _id: "golfer_malley_laurenymalley@gmail.com",
//         type: "golfer",
//         lastName: "Malley",
//         firstName: "Lauren",
//         handicap: 12,
//         gender: "F",
//         emailAddress: "laurenymalley@gmail.com"
//       }
//     ],
//     primaryGolfer_id: "golfer_wertz_timmylwertz@gmail.com"
//   }

const reqFields = [
  "_id",
  "type",
  "_rev",
  "teeTimeDate",
  "teeTimeCreated",
  "courseId",
  "hcpRange",
  "groupSize",
  "gender",
  "golfer_id"
];

const allowedFields = [];

const teeTimeRoutes = app => {
  app.get("/", (req, res) => res.send("Welcome to the ForeSome API"));
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
        "gender",
        "golfer_id"
      ],
      newTeeTime
    );

    if (not(isEmpty(missingFields))) {
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
        "gender",
        "golfer_id"
      ],
      newTeeTime
    );
    addTeeTime(finalTeeTime)
      .then(addResult => {
        console.log(addResult);
        res.status(201).send(addResult);
      })
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err));
      });
  });
  app.put("/teetimes/:id", (req, res, next) => {
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
        "gender",
        "golfer_id"
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
        "gender",
        "golfer_id"
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
