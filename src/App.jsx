import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ToDoPage from "./pages/ToDoPage";
import StatsPage from "./pages/StatsPage";
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedTaskList = JSON.parse(localStorage.getItem("userTaskList"));
    const storedToDoList = JSON.parse(localStorage.getItem("userToDo"));
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedTaskList && storedToDoList && storedUser) {
      setTaskList(storedTaskList);
      setToDoList(storedToDoList);
      setUser(storedUser);
    } else {
      const numDaysPerMonth = createNumDaysPerMonth(29);
      const newTaskList = createNewTaskList(numDaysPerMonth);
      setEmptyTaskList(newTaskList);
      setTaskList(newTaskList);
      setToDoList(newTaskList);
      localStorage.setItem("userTaskList", JSON.stringify(newTaskList));
      localStorage.setItem("userToDo", JSON.stringify(newTaskList));
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
              />
            }
          />
          <Route
            exact
            path="/sign-up"
            element={<SignUpPage taskList={taskList} />}
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
