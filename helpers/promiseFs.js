const fs = require("fs");
const { promisify } = require("util");

module.exports = Object.keys(fs).reduce((acc, key) => {
  if (key.match(/sync/gi)) {
    acc[key] = fs[key];
  } else {
    try {
      acc[key] = promisify(fs[key]);
    } catch (err) {
      acc[key] = fs[key];
    }
  }
  return acc;
}, {});
