function getNumDays(month) {
  if (month == 2) return 28;
  if (month == 4 || month == 6 || month == 9 || month == 11) return 30;
  return 31;
}

function getMonthRange(month, year) {
  const lo = new Date(year, month - 1, 1).getTime() / 1000;
  const hi =
    new Date(year, month - 1, getNumDays(month), 23, 59, 59).getTime() / 1000;
  return { lo, hi };
}

module.exports = getMonthRange;
