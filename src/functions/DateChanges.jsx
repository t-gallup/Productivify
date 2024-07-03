import PropTypes from "prop-types";

export function FindMonday(displayDay) {
  const dayOfWeek = displayDay.getDay();
  const diffToMonday = (dayOfWeek + 6) % 7;
  const monday = new Date(displayDay);
  monday.setDate(displayDay.getDate() - diffToMonday);
  return monday
}

export function SetSunday(monday, setDisplaySunday) {
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  setDisplaySunday(sunday);
}

export function AddWeek({displayDay, setDisplayDay, setFebDays,}) {
  const newDate = new Date(displayDay.getFullYear(), displayDay.getMonth(), displayDay.getDate() + 7);
  setDisplayDay(newDate);
  if (displayDay.getFullYear() % 4 == 0) {
    setFebDays(29);
  }
  else {
    setFebDays(28);
  }
  return newDate;
}
export function AddMonth({displayDay, setDisplayDay, setFebDays}) {
  const newDate = new Date(displayDay.getFullYear(), displayDay.getMonth() + 1, displayDay.getDate());
  setDisplayDay(newDate);
  if (displayDay.getFullYear() % 4 == 0) {
    setFebDays(29);
  }
  else {
    setFebDays(28);
  }
  return newDate;
}

export function AddYear({displayDay, setDisplayDay, setFebDays}) {
  const newDate = new Date(displayDay.getFullYear() + 1, displayDay.getMonth(), displayDay.getDate());
  setDisplayDay(newDate);
  if (displayDay.getFullYear() % 4 == 0) {
    setFebDays(29);
  }
  else {
    setFebDays(28);
  }
}

export function SubtractWeek({displayDay, setDisplayDay, setFebDays}) {
  const newDate = new Date(displayDay.getFullYear(), displayDay.getMonth(), displayDay.getDate() - 7)
  setDisplayDay(newDate);
  if (displayDay.getFullYear() % 4 == 0) {
    setFebDays(29);
  }
  else {
    setFebDays(28);
  }
  return newDate;
}

export function SubtractMonth({displayDay, setDisplayDay, setFebDays}) {
  const newDate = new Date(displayDay.getFullYear(), displayDay.getMonth() - 1, displayDay.getDate())
  setDisplayDay(newDate);
  if (displayDay.getFullYear() % 4 == 0) {
    setFebDays(29);
  }
  else {
    setFebDays(28);
  }
  return newDate;
}

export function SubtractYear({displayDay, setDisplayDay, setFebDays}) {
  const newDate = new Date(displayDay.getFullYear() - 1, displayDay.getMonth(), displayDay.getDate())
  setDisplayDay(newDate);
  if (displayDay.getFullYear() % 4 == 0) {
    setFebDays(29);
  }
  else {
    setFebDays(28);
  }
}

export function DateToKey(date) {
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${date.getDate()
    .toString()
    .padStart(2, "0")}`;
}


AddMonth.propTypes = {
  displayDay: PropTypes.Date,
  setDisplayDay: PropTypes.func,
  setFebDays: PropTypes.func,
};

SubtractMonth.propTypes = {
  displayDay: PropTypes.Date,
  setDisplayDay: PropTypes.func,
  setFebDays: PropTypes.func,
};

DateToKey.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}
