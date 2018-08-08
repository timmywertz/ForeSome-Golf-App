require("dotenv").config();
const PORT = process.env.PORT;
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

const courses = require("./routes/course");
const golfers = require("./routes/golfer");
const teeTimes = require("./routes/teetime");

app.use(bodyParser.json());

app.use(cors({ credentials: true }));

courses(app);
golfers(app);
teeTimes(app);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

app.use((err, req, res, next) => {
  console.log("error", err);
  next(err);
});

app.listen(PORT || 5000, () =>
  console.log("ForeSome server is up and running", PORT || 5000)
);
