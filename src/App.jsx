import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ToDoPage from "./pages/ToDoPage";
import StatsPage from "./pages/StatsPage";
import HabitPage from "./pages/HabitPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { useState, useEffect } from "react";
import { writeUserHabit } from "./functions/DatabaseFunctions";
import { auth } from "./firebase";

function App() {
  const [taskList, setTaskList] = useState({});
  const [toDoList, setToDoList] = useState({});
  const [habitList, setHabitList] = useState({});
  const [user, setUser] = useState(null);
  const [isToDo, setIsToDo] = useState(false);

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
      const newTaskList = {};
      const newToDoList = {};
      const newHabitList = {};
      setTaskList(newTaskList);
      setToDoList(newToDoList);
      setHabitList(newHabitList);
      localStorage.setItem("userTaskList", JSON.stringify(newTaskList));
      localStorage.setItem("userToDo", JSON.stringify(newToDoList));
      localStorage.setItem("userHabit", JSON.stringify(newHabitList));
    }
    // const newHabitList = {};
    // localStorage.setItem("userHabit", JSON.stringify(newHabitList));
    // writeUserHabit(auth.currentUser.uid, newHabitList);
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
                user={user}
                setUser={setUser}
                toDoList={toDoList}
                setToDoList={setToDoList}
                habitList={habitList}
                setHabitList={setHabitList}
                isToDo={isToDo}
                setIsToDo={setIsToDo}
              />
            }
          />
          <Route
            exact
            path="/sign-in"
            element={
              <SignInPage
                setTaskList={setTaskList}
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
                taskList={taskList}
                toDoList={toDoList}
                setToDoList={setToDoList}
                habitList={habitList}
                setHabitList={setHabitList}
                isToDo={isToDo}
                setIsToDo={setIsToDo}
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
                taskList={taskList}
                toDoList={toDoList}
                setToDoList={setToDoList}
                habitList={habitList}
                setHabitList={setHabitList}
                isToDo={isToDo}
                setIsToDo={setIsToDo}
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
                setToDoList={setToDoList}
                setHabitList={setHabitList}
                taskList={taskList}
                toDoList={toDoList}
                habitList={habitList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
