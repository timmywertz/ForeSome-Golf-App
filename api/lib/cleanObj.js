const { pick, curry } = require("ramda");

module.exports = curry((arr, obj) => pick(arr, obj));
