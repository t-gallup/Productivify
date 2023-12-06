import PropTypes from "prop-types";

export function AddMonth({displayDay, setDisplayDay, setFebDays, setFirstDayOfMonth, firstDayOfMonth}) {
  if (displayDay.getMonth() == 11) {
    const newDate = new Date(displayDay.getFullYear() + 1, 0, displayDay.getDay());
    displayDay = newDate;
    setDisplayDay(newDate);
    if (displayDay.getFullYear() % 4 == 0) {
      setFebDays(29);
    }
    else {
      setFebDays(28);
    }
  } else {
    const newDate = new Date(displayDay.getFullYear(), displayDay.getMonth() + 1, displayDay.getDay());
    displayDay = newDate;
    setDisplayDay(newDate);
  }
  setFirstDayOfMonth(new Date(displayDay.getFullYear(), displayDay.getMonth(), 1).getDay());
  console.log("Display Month: ", displayDay.getMonth());
  console.log("First Day of Month: ", firstDayOfMonth);
}

export function SubtractMonth({displayDay, setDisplayDay, setFebDays, setFirstDayOfMonth, firstDayOfMonth}) {
  if (displayDay.getMonth() == 0) {
    const newDate = new Date(displayDay.getFullYear() - 1, 11, displayDay.getDay());
    displayDay = newDate;
    setDisplayDay(newDate);
    if (displayDay.getFullYear() % 4 == 0) {
      setFebDays(29);
    }
    else {
      setFebDays(28);
    }
  } else {
    const newDate = new Date(displayDay.getFullYear(), displayDay.getMonth() - 1, displayDay.getDay())
    setDisplayDay(newDate);
    displayDay = newDate;
  }
  setFirstDayOfMonth(new Date(displayDay.getFullYear(), displayDay.getMonth(), 1).getDay());
  console.log("Display Month: ", displayDay.getMonth());
  console.log("First Day of Month: ", firstDayOfMonth);
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
