const NodeHTTPError = require("node-http-error");
const { getGolfers, getGolfer, addGolfer } = require("../dal");
const bodyParser = require("body-parser");
const { concat, isEmpty, not, pathOr, propOr } = require("ramda");
const checkRequiredFields = require("../lib/checkRequiredFields");
const cleanObj = require("../lib/cleanObj");
const missingFieldMsg = require("../lib/missingFieldMsg");

// {
//     _id: "golfer_wertz_timmylwertz@gmail.com",
//     type: "golfer",
//     lastName: "Wertz",
//     firstName: "Tim",
//     handicap: 10,
//     gender: "M",
//     emailAddress: "timmylwertz@gmail.com"
//   },

const reqFields = ["firstName", "lastName", "emailAddress"];

const allowedFields = concat(["handicap", "gender", "password"], reqFields);

const golferRoutes = app => {
  //app.get("/", (req, res) => res.send("Welcome to the ForeSome API"));
  app.get("/golfers", (req, res, next) => {
    getGolfers()
      .then(golfers => res.status(200).send(golfers))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err));
      });
  });
  app.get("/golfers/:id", (req, res, next) => {
    const golferId = pathOr("", ["params", "id"], req);
    getGolfer(golferId)
      .then(golfer => res.status(200).send(golfer))
      .catch(err => {
        next(new NodeHTTPError(err.status, err.message, err));
      });
  });
  app.post("/golfers", (req, res, next) => {
    const newGolfer = propOr({}, "body", req);
    //   console.log(JSON.stringify(newTeeTime));

    if (isEmpty(newGolfer)) {
      next(
        new NodeHTTPError(
          400,
          "No valid JSON document was provided in the request body."
        )
      );
      return;
    }

    const missingFields = checkRequiredFields(reqFields, newGolfer);

    if (not(isEmpty(missingFields))) {
      next(new NodeHTTPError(400, missingFieldMsg(missingFields)));
      return;
    }
    const cleanGolfer = cleanObj(allowedFields, newGolfer);

    addGolfer(cleanGolfer)
      .then(result => {
        console.log({ result });
        res.status(201).send(result);
      })
      .catch(err => new NodeHTTPError(err.status, err.message, err));
  });
};

module.exports = golferRoutes;
