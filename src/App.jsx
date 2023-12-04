import "./App.css";
import Box from "./components/Box";

function App() {
  // const [count, setCount] = useState(0)
  // const taskLists = [
  //   {
  //     3: "String racket"
  //   }
  // ]
  const emptyList = [];
  const taskLists = ["String racket"];

  return (
    <>
      <div className="calendar">
        <h1>Task Tracker</h1>
        <div className="month">
          <p className="month-item">&#10094;</p>
          <p className="month-item">December</p>
          <p className="month-item">&#10095;</p>
        </div>

        <div className="boxes">
          <Box className="box-child" day="" tasks={emptyList}/>
          <Box className="box-child" day="" tasks={emptyList} />
          <Box className="box-child" day="" tasks={emptyList} />
          <Box className="box-child" day="" tasks={emptyList} />
          <Box className="box-child" day="" tasks={emptyList} />
          <Box className="box-child" day="1" tasks={emptyList} />
          <Box className="box-child" day="2" tasks={emptyList} />
          <Box className="box-child" day="3" tasks={taskLists} />
          <Box className="box-child" day="4" tasks={emptyList} />
          <Box className="box-child" day="5" tasks={emptyList} />
          <Box className="box-child" day="6" tasks={emptyList} />
          <Box className="box-child" day="7" tasks={emptyList} />
          <Box className="box-child" day="8" tasks={emptyList} />
          <Box className="box-child" day="9" tasks={emptyList} />
          <Box className="box-child" day="10" tasks={emptyList} />
          <Box className="box-child" day="11" tasks={emptyList} />
          <Box className="box-child" day="12" tasks={emptyList} />
          <Box className="box-child" day="13" tasks={emptyList} />
          <Box className="box-child" day="14" tasks={emptyList} />
          <Box className="box-child" day="15" tasks={emptyList} />
          <Box className="box-child" day="16" tasks={emptyList} />
          <Box className="box-child" day="17" tasks={emptyList} />
          <Box className="box-child" day="18" tasks={emptyList} />
          <Box className="box-child" day="19" tasks={emptyList} />
          <Box className="box-child" day="20" tasks={emptyList} />
          <Box className="box-child" day="21" tasks={emptyList} />
          <Box className="box-child" day="22" tasks={emptyList} />
          <Box className="box-child" day="23" tasks={emptyList} />
          <Box className="box-child" day="24" tasks={emptyList} />
          <Box className="box-child" day="25" tasks={emptyList} />
          <Box className="box-child" day="26" tasks={emptyList} />
          <Box className="box-child" day="27" tasks={emptyList} />
          <Box className="box-child" day="28" tasks={emptyList} />
          <Box className="box-child" day="29" tasks={emptyList} />
          <Box className="box-child" day="30" tasks={emptyList} />
          <Box className="box-child" day="31" tasks={emptyList} />
          <Box className="box-child" day="" tasks={emptyList} />
          <Box className="box-child" day="" tasks={emptyList} />
          <Box className="box-child" day="" tasks={emptyList} />
          <Box className="box-child" day="" tasks={emptyList} />
          <Box className="box-child" day="" tasks={emptyList} />
          <Box className="box-child" day="" tasks={emptyList} />
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
