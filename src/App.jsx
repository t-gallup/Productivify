import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ToDoPage from "./pages/ToDoPage";
import StatsPage from "./pages/StatsPage";
import HabitPage from "./pages/HabitPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import {
  createNewTaskList,
  createNumDaysPerMonth,
} from "./functions/InitializationFunctions";
import { useState, useEffect } from "react";

function App() {
  const [emptyTaskList, setEmptyTaskList] = useState({});
  const [taskList, setTaskList] = useState({});
  const [toDoList, setToDoList] = useState({});
  const [habitList, setHabitList] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedTaskList = JSON.parse(localStorage.getItem("userTaskList"));
    const storedToDoList = JSON.parse(localStorage.getItem("userToDo"));
    const storedHabitList = JSON.parse(localStorage.getItem("userHabit"));
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedTaskList && storedToDoList && storedHabitList && storedUser) {
      setTaskList(storedTaskList);
      setToDoList(storedToDoList);
      setHabitList(storedHabitList);
      setUser(storedUser);
    } else {
      const numDaysPerMonth = createNumDaysPerMonth(29);
      const newTaskList = createNewTaskList(numDaysPerMonth);
      const newHabitList = {};
      setEmptyTaskList(newTaskList);
      setTaskList(newTaskList);
      setToDoList(newTaskList);
      setHabitList(newHabitList);
      localStorage.setItem("userTaskList", JSON.stringify(newTaskList));
      localStorage.setItem("userToDo", JSON.stringify(newTaskList));
      localStorage.setItem("userHabit", JSON.stringify(newHabitList));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <CalendarPage
                taskList={taskList}
                setTaskList={setTaskList}
                emptyTaskList={emptyTaskList}
                user={user}
                setUser={setUser}
                toDoList={toDoList}
                setToDoList={setToDoList}
                habitList={habitList}
                setHabitList={setHabitList}
              />
            }
          />
          <Route
            exact
            path="/sign-in"
            element={
              <SignInPage
                setTaskList={setTaskList}
                emptyTaskList={emptyTaskList}
                setToDoList={setToDoList}
                setHabitList={setHabitList}
              />
            }
          />
          <Route
            exact
            path="/sign-up"
            element={
              <SignUpPage 
                taskList={taskList} 
                toDoList={toDoList}
                habitList={habitList}
              />
            }
          />
          <Route
            exact
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            exact
            path="/to-do"
            element={
              <ToDoPage
                user={user}
                setUser={setUser}
                setTaskList={setTaskList}
                emptyTaskList={emptyTaskList}
                taskList={taskList}
                toDoList={toDoList}
                setToDoList={setToDoList}
                habitList={habitList}
                setHabitList={setHabitList}
              />
            }
          />
          <Route
            exact
            path="/habit"
            element={
              <HabitPage
                user={user}
                setUser={setUser}
                setTaskList={setTaskList}
                emptyTaskList={emptyTaskList}
                taskList={taskList}
                toDoList={toDoList}
                setToDoList={setToDoList}
                habitList={habitList}
                setHabitList={setHabitList}
              />
            }
          />
          <Route
            exact
            path="/stats"
            element={
              <StatsPage
                user={user}
                setUser={setUser}
                setTaskList={setTaskList}
                emptyTaskList={emptyTaskList}
                setToDoList={setToDoList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
