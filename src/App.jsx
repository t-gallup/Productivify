import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ToDoPage from "./pages/ToDoPage";
import StatsPage from "./pages/StatsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import {
  createNewTaskLists,
  createNumDaysPerMonth,
} from "./functions/InitializationFunctions";

import { useState, useEffect } from "react";

function App() {
  
  const [emptyTaskLists, setEmptyTaskLists] = useState({});
  const [taskLists, setTaskLists] = useState({});
  const [toDoList, setToDoList] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const numDaysPerMonth = createNumDaysPerMonth(29);
    const newTaskLists = createNewTaskLists(numDaysPerMonth);
    setEmptyTaskLists(newTaskLists);
    setTaskLists(structuredClone(newTaskLists));
    setToDoList(structuredClone(newTaskLists));
    console.log("Set up App");
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
                taskLists={taskLists}
                setTaskLists={setTaskLists}
                emptyTaskLists={emptyTaskLists}
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
                setTaskLists={setTaskLists}
                emptyTaskLists={emptyTaskLists}
                taskLists={taskLists}
              />
            }
          />
          <Route
            exact
            path="/sign-up"
            element={<SignUpPage taskLists={taskLists} />}
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
                setTaskLists={setTaskLists}
                emptyTaskLists={emptyTaskLists}
                taskLists={taskLists}
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
                setTaskLists={setTaskLists}
                emptyTaskLists={emptyTaskLists}
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
