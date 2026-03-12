function getNumDays(month) {
  if (month == 2) return 28;
  if (month == 4 || month == 6 || month == 9 || month == 11) return 30;
  return 31;
}

module.exports = getNumDays;
