const NodeHTTPError = require("node-http-error");
const { getGolfers, getGolfer } = require("../dal");
const bodyParser = require("body-parser");
const { not, pathOr } = require("ramda");

// {
//     _id: "golfer_wertz_timmylwertz@gmail.com",
//     type: "golfer",
//     lastName: "Wertz",
//     firstName: "Tim",
//     handicap: 10,
//     gender: "M",
//     emailAddress: "timmylwertz@gmail.com"
//   },

const reqFields = ["_id", "lastName", "firstName", "emailAddress"];

const allowedFields = ["handicap", "gender"];

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
};

module.exports = golferRoutes;
