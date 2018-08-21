const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
const { map, prop } = require("ramda");
const pkGen = require("./lib/pkGen");

const COUCHDB_SERVER = process.env.COUCHDB_SERVER;
const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME;
const DB_URL = `${COUCHDB_SERVER}${COUCHDB_DBNAME}`;

const db = new PouchDB(DB_URL);

const getGolfer = id => db.get(id);

const getGolfers = () =>
  db
    .allDocs({
      include_docs: true,
      startkey: "golfer_",
      endkey: "golfer_\ufff0"
    })
    .then(docs => map(prop("doc"), docs.rows));

const getCourse = id => db.get(id);

const getCourses = () =>
  db
    .allDocs({
      include_docs: true,
      startkey: "course_",
      endkey: "course_\ufff0"
    })
    .then(docs => map(prop("doc"), docs.rows));

const getTeeTime = id => db.get(id);

const getTeeTimes = () =>
  db
    .allDocs({
      include_docs: true,
      startkey: "teetime_",
      endkey: "teetime_\ufff0"
    })
    .then(docs => map(prop("doc"), docs.rows));

const addTeeTime = teeTimeDoc => {
  const newID = pkGen("teetime_", prop("name", teeTimeDoc));
  const newTeeTime = merge(categoryDoc, {
    type: "teetime",
    _id: newID
  });
  return db.put(newTeeTime);
};

const putTeeTime = teeTime => {
  return db.put(event);
};

const joinTeeTime = id =>
  db.put(
    merge(id, {
      type: "event",
      _id: pkGen("teetime_", prop("name", id))
    })
  );

module.exports = {
  getGolfers,
  getGolfer,
  getCourses,
  getCourse,
  getTeeTimes,
  getTeeTime,
  addTeeTime,
  putTeeTime,
  joinTeeTime
};
