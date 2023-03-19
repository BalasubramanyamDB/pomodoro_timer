import { createContext, useContext, useReducer } from "react";
import { taskReducer } from "../reducers/taskReducer";
import { getLocalStorage } from "../utils/localStorage";
const TaskContext = createContext([]);
const TaskProvider = ({ children }) => {
  const [task, dispatch] = useReducer(
    taskReducer,
    getLocalStorage("task") ?? []
  );
  return (
    <TaskContext.Provider value={{ task, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
const useTask = () => useContext(TaskContext);
export { useTask, TaskProvider };
