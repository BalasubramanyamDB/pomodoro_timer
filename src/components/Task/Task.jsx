import React from "react";
import { useNavigate } from "react-router-dom";
import { DELETE_TASK, TOGGLE_CHECKED } from "../../constants";
import { useModal, useTask } from "../../context";
import { setLocalStorage } from "../../utils/localStorage";
import "./Task.css";

function Task({ task }) {
  const { setModal } = useModal();
  const { dispatch } = useTask();
  const { isChecked, taskName, timeRemaining } = task;
  const navigate = useNavigate();
  return (
    <div
      className={`task-container width-100 display-flex align-items-center justify-content-between mb-9 ${
        isChecked ? `isChecked-task` : ``
      }`}>
      <div className="task-checkbox-container ml-9">
        <input
          type="checkbox"
          className={`task-checkbox ${isChecked ? `isChecked` : ``}`}
          checked={isChecked}
          onChange={() => dispatch({ type: TOGGLE_CHECKED, payload: task })}
        />
      </div>
      <div
        onClick={() => navigate(`/tasks/${task.id}`)}
        className="task-details display-flex align-items-center justify-content-center">
        <p className="txt-md ml-9 pb-3 color-text-gray task-title">
          {taskName}
        </p>
        <p className="ml-9 task-details-timer">
          <i className="fas fa-stopwatch"></i> {Math.floor(timeRemaining / 60)}
        </p>
      </div>
      <div className="task-cta">
        <button
          onClick={() => {
            setLocalStorage("EditTask", task);
            setModal((modal) => !modal);
          }}
          className="btn-task-cta txt-md mr-9">
          <i className="fas fa-edit"></i>
        </button>
        <button
          onClick={() => dispatch({ type: DELETE_TASK, payload: task.id })}
          className="btn-task-cta txt-md mr-9">
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
}

export { Task };
