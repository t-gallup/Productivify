import "./App.css";
import Box from "./components/Box";
import NewTaskWindow from "./components/NewTaskWindow";
import {useState} from 'react';
import {SubtractMonth, AddMonth} from "./functions/DateChanges";

function App() {
  // const [count, setCount] = useState(0)
  // const taskLists = [
  //   {
  //     3: "String racket"
  //   }
  // ]
  const emptyList = [];
  const days = [...Array(31).keys()].map(x => ++x);
  const taskLists = days.map((day) => <li key={day.toString()}>{[]}</li>)
  const [openWindow, setOpenWindow] = useState(false);
  const currentDay = new Date(Date.now())
  const [displayDay, setDisplayDay] = useState(currentDay);
  const firstDayOfMonth = new Date(displayDay.getFullYear(), displayDay.getMonth(), 1).getDay();

  const monthMappings = {
    0: "January",
    1: "Feburary",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
  };
  


  const [febDays, setFebDays] = useState((displayDay.getFullYear() % 4 == 0) ? 29 : 28);
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
    11: 31
  }

  return (
    <>
      <NewTaskWindow openWindow={openWindow} setOpenWindow={setOpenWindow}></NewTaskWindow>
      <div className="calendar">
        <div className="header-wrap">
          <h1>Task Tracker</h1>
          <button className="task-button" onClick={() => setOpenWindow(true)}>Add Task</button>
        </div>
        
        <div className="month">
          <button className="month-item" 
          onClick={() => SubtractMonth({displayDay, setDisplayDay, setFebDays})}
          >&#10094;</button>
          <p className="month-item month-text">{monthMappings[displayDay.getMonth()]} {displayDay.getFullYear()}</p>
          <button className="month-item" 
          onClick={() => AddMonth({displayDay, setDisplayDay, setFebDays})}
          >&#10095;</button>
        </div>

        <div className="weekdays">
          <p className="weekday">Sun</p>
          <p className="weekday">Mon</p>
          <p className="weekday">Tues</p>
          <p className="weekday">Wed</p>
          <p className="weekday">Thurs</p>
          <p className="weekday">Fri</p>
          <p className="weekday">Sat</p>
        </div>

        <div className="boxes">
          {[...Array(firstDayOfMonth)].map((x) => {return (<Box key={x} className="box-child" day="" tasks={emptyList}/>)})}
          {[...Array.from({ length: numDaysPerMonth[displayDay.getMonth()] }, (_, index) => index + 1)].map((x) => {return (<Box key={x} className="box-child" day={x} tasks={emptyList}/>)})}
          {[...Array(7 - (firstDayOfMonth + numDaysPerMonth[displayDay.getMonth()]) % 7)].map((x) => {return (<Box key={x} className="box-child" day="" tasks={emptyList}/>)})}
        </div>

        {/* <div>

    <ul class="weekdays">
      <li>Mo</li>
      <li>Tu</li>
      <li>We</li>
      <li>Th</li>
      <li>Fr</li>
      <li>Sa</li>
      <li>Su</li>
    </ul>
    </div>

    <div>

    <ul class="days">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li><span class="active">10</span></li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
    </ul>
  </div> */}
      </div>
    </>
  );
}

export default App;
