const PouchDB = require("pouchdb-core");
PouchDB.plugin(require("pouchdb-adapter-http"));
const { map, prop } = require("ramda");

const COUCHDB_SERVER = process.env.COUCHDB_SERVER;
const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME;
const DB_URL = `${COUCHDB_SERVER}${COUCHDB_DBNAME}`;

const db = new PouchDB(DB_URL);

// const getGolfers = id => db.get(id)

const getGolfers = () =>
  db
    .allDocs({
      include_docs: true,
      startkey: "golfer_",
      endkey: "golfer_\ufff0"
    })
    .then(docs => map(prop("doc"), docs.rows));

// const getCourses = id => db.get(id)

const getCourses = () =>
  db
    .allDocs({
      include_docs: true,
      startkey: "course_",
      endkey: "course_\ufff0"
    })
    .then(docs => map(prop("doc"), docs.rows));

// const getTeeTimes = id => db.get(id)

const getTeeTimes = () =>
  db
    .allDocs({
      include_docs: true,
      startkey: "teetime_",
      endkey: "teetime_\ufff0"
    })
    .then(docs => map(prop("doc"), docs.rows));

module.exports = {
  getGolfers,
  getCourses,
  getTeeTimes
};
