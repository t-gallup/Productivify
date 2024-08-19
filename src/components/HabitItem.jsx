import "./HabitItem.css";
import PropTypes from "prop-types";

import { DateToKey } from "../functions/DateChanges";
import { writeUserHabit } from "../functions/DatabaseFunctions";
import { auth } from "../firebase";

function HabitItem(props) {
  const dateKeys = [];
  for (let i = 0; i < 7; i++) {
    var currDate = new Date(props.displayDay);
    currDate.setDate(props.displayDay.getDate() + i);
    dateKeys.push(DateToKey(currDate));
  }

  const datesDict = props.habitList[props.habitName]["Dates"];
  const habitTime = props.habitList[props.habitName]["Time"];
  const habitWeekdays = props.habitList[props.habitName]["Weekdays"];

  function updateHabit (date, isCheck) {
    const newHabitList = structuredClone(props.habitList);
    if (isCheck) {
      newHabitList[props.habitName]["Dates"][date] = 1;
    } else {
      newHabitList[props.habitName]["Dates"][date] = 0;
    }
    writeUserHabit(auth.currentUser.uid, newHabitList);
    props.setHabitList(newHabitList);
    localStorage.setItem("userHabit", JSON.stringify(newHabitList));
  };

  function clearHabit(date) {
    const newHabitList = structuredClone(props.habitList);
    delete newHabitList[props.habitName]["Dates"][date];
    writeUserHabit(auth.currentUser.uid, newHabitList);
    props.setHabitList(newHabitList);
    localStorage.setItem("userHabit", JSON.stringify(newHabitList));
  };

  function handleEditButtonClick(description, setEditDescription, setOpenEditWindow) {
    setEditDescription(description);
    setOpenEditWindow(true);
  }

  return (
    <>
      <div className="habit-box">
        <div className="habit-button-wrapper">
          <button
            className="habit-grid-item"
            onClick={() => {
              handleEditButtonClick([props.habitName, habitTime], props.setEditDescription, props.setOpenEditWindow)
            }}
          >
            <p className="habit-name">
              {props.habitName + " (" + habitTime}
              {habitTime === "1" ? " hour" : " hours"}
              {")"}
            </p>
          </button>
          {dateKeys.map((date, index) => (
            <>
              {!(habitWeekdays[index]) && (
                <div className="habit-grid-box habit-grid-item">
                  <p className="non-day">-</p>
                </div>
                
              )}
              {(habitWeekdays[index]) && datesDict && !(date in datesDict) && (
                <div className="habit-grid-box habit-grid-item">
                  <button
                    className="check"
                    onClick={() => updateHabit(date, true)}
                  >
                    &#x2611;
                  </button>
                  <button
                    className="x"
                    onClick={() => updateHabit(date, false)}
                  >
                    &#x2612;
                  </button>
                </div>
              )}
              {datesDict && datesDict[date] === 1 && (
                <div className="habit-grid-box habit-grid-item">
                  <div className="check-wrapper">
                    <p className="static-check">&#x2611;</p>
                    <button
                      className="circle-x"
                      onClick={() => clearHabit(date)}
                    >
                      &#x24E7;
                    </button>
                  </div>
                </div>
              )}
              {datesDict && datesDict[date] === 0 && (
                <div className="habit-grid-box habit-grid-item">
                  <div className="x-wrapper">
                    <p className="static-x">&#x2612;</p>
                    <button
                      className="circle-x red"
                      onClick={() => clearHabit(date)}
                    >
                      &#x24E7;
                    </button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}

HabitItem.propTypes = {
  habitName: PropTypes.string.isRequired,
  setEditDescription: PropTypes.func.isRequired,
  setOpenEditWindow: PropTypes.func.isRequired,
  habitList: PropTypes.object.isRequired,
  setHabitList: PropTypes.func.isRequired,
  displayDay: PropTypes.instanceOf(Date).isRequired
};

export default HabitItem;
