import React, { useEffect } from "react";
import { ShowAllTasks, AddFirstTask } from "../../components/";
import { useDocumentTitle } from "../../hooks";
import { useAuth, useTask, useTheme } from "../../context";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";

import "./Tasks.css";
function Tasks() {
  useDocumentTitle("Tasks | Buzzer Beater");
  const { task } = useTask();
  const { setTheme } = useTheme();
  const { currentUser } = useAuth();
  useEffect(() => {
    setTheme(getLocalStorage("theme"));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLocalStorage("task", task);
  });

  return (
    <div className="tasks-wrapper mx-auto display-flex flex-col p-9">
      <h2 className="txt-white my-5 mx-0">
        Welcome back{" "}
        {currentUser?.displayName ? currentUser.displayName : "User"}!
      </h2>
      <h3 className="txt-white my-5 mx-0">
        {task.length === 0
          ? "Add a task to get started"
          : "You have some tasks"}
      </h3>
      <div className="tasks-container">
        {task.length === 0 ? <AddFirstTask /> : <ShowAllTasks />}
      </div>
    </div>
  );
}

export { Tasks };
