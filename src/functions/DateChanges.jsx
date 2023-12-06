import PropTypes from "prop-types";

export function AddMonth({displayDay, setDisplayDay, setFebDays}) {
  const newDate = new Date(displayDay.getFullYear(), displayDay.getMonth() + 1, displayDay.getDay());
  displayDay = newDate;
  setDisplayDay(newDate);
  if (displayDay.getFullYear() % 4 == 0) {
    setFebDays(29);
  }
  else {
    setFebDays(28);
  }
}

export function SubtractMonth({displayDay, setDisplayDay, setFebDays}) {
  const newDate = new Date(displayDay.getFullYear(), displayDay.getMonth() - 1, displayDay.getDay())
  setDisplayDay(newDate);
  displayDay = newDate;
  if (displayDay.getFullYear() % 4 == 0) {
    setFebDays(29);
  }
  else {
    setFebDays(28);
  }
}

AddMonth.propTypes = {
  displayDay: PropTypes.Date,
  setDisplayDay: PropTypes.func,
  setFebDays: PropTypes.func,
  setFirstDayOfMonth: PropTypes.func,
};

SubtractMonth.propTypes = {
  displayDay: PropTypes.Date,
  setDisplayDay: PropTypes.func,
  setFebDays: PropTypes.func,
  setFirstDayOfMonth: PropTypes.func,
};
