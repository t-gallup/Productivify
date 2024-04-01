export function createNumDaysPerMonth(febDays) {
  const numDaysPerMonth = {
    0: 31,
    1: febDays,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31,
  };
  return numDaysPerMonth;
}

export function createNewTaskList(numDaysPerMonth) {
  const newTaskList = {};
  const years = Array.from({ length: 100 }, (_, index) => index + 2000);
  years.forEach((year) => {
    for (let month = 1; month <= 12; month++) {
      var currNumDays = numDaysPerMonth[month - 1];
      if (year % 4 == 0 && month == 2) {
        currNumDays = 29;
      }
      for (let day = 1; day <= currNumDays; day++) {
        const key = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;
        newTaskList[key] = [];
      }
    }
  });
  return newTaskList;
}
