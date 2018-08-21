const { difference, keys, curry } = require("ramda");

module.exports = curry((arr, obj) => difference(arr, keys(obj)));
