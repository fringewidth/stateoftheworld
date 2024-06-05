const getNumDays = require("./getNumDays");

function getMonthRange(month, year) {
  const lo = new Date(year, month - 1, 1).getTime() / 1000;
  const hi =
    new Date(year, month - 1, getNumDays(month), 23, 59, 59).getTime() / 1000;
  return { lo, hi };
}

module.exports = getMonthRange;
