const NodeHTTPError = require("node-http-error");
const { getGolfers } = require("../dal");
const bodyParser = require("body-parser");
const { not } = require("ramda");

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
};

module.exports = golferRoutes;
