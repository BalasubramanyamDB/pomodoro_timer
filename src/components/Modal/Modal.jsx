import React, { useEffect, useReducer } from "react";
import { useModal, useTask } from "../../context";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import {
  INITIAL_TASK_STATE,
  TASK_NAME,
  TASK_DESCRIPTION,
  TIMER_POMODORO,
  TIMER_SHORT,
  TIMER_LONG,
  INC_TIMER_POMODORO,
  INC_TIMER_SHORT,
  INC_TIMER_LONG,
  DEC_TIMER_POMODORO,
  DEC_TIMER_SHORT,
  DEC_TIMER_LONG,
  ADD_TASK,
  EDIT_TASK,
} from "../../constants";
import "./Modal.css";
import { taskDetailsReducer } from "../../reducers";

function Modal() {
  const task = getLocalStorage("EditTask");
  const { setModal } = useModal();
  const [taskDeatails, dispatch] = useReducer(
    taskDetailsReducer,
    task ?? INITIAL_TASK_STATE
  );
  const { task: userTask, dispatch: taskDispatch } = useTask();
  const { taskName, taskDescription, timerPomodoro, timerShort, timerLong } =
    taskDeatails;
  const handleSubmit = (e) => {
    e.preventDefault();
    task
      ? taskDispatch({ type: EDIT_TASK, payload: taskDeatails })
      : taskDispatch({ type: ADD_TASK, payload: taskDeatails });
    setModal((modal) => !modal);
  };
  useEffect(() => {
    setLocalStorage("task", userTask);
  }, [userTask]);

  return (
    <div className="modal-background display-flex justify-content-center align-items-center">
      <div className="modal-container display-flex p-9 flex-col gap-1">
        <div className="width-100 display-flex">
          <header className="display-flex justify-content-center width-100">
            <h3 className="m-0 color-text-gray">Task</h3>
          </header>
          <button
            onClick={() => setModal((modal) => !modal)}
            className="modal-close txt-md ml-auto">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="modal-body display-flex flex-col gap-1">
          <div className="task-name width-100">
            <label>
              <input
                type="text"
                maxLength="30"
                placeholder="What are you working on?"
                className="task-input py-3 txt-md width-100"
                required
                value={taskName}
                onChange={(e) =>
                  dispatch({ type: TASK_NAME, payload: e.target.value })
                }
              />
            </label>
          </div>
          <div className="width-100 display-flex flex-col">
            <textarea
              placeholder="Describe your task!"
              rows="4"
              minLength="10"
              maxLength="100"
              required
              type="text"
              id="task-description"
              value={taskDescription}
              onChange={(e) =>
                dispatch({ type: TASK_DESCRIPTION, payload: e.target.value })
              }
              className="task-textarea p-5"></textarea>
          </div>

          <div className="task-timer-container">
            <div className="width-100 display-flex flex-col">
              <label
                htmlFor="pomodoro-timer"
                className="txt-semibold color-text-gray">
                Pomodoro Duration
              </label>
              <div className="display-flex">
                <input
                  type="number"
                  id="pomodoro-timer"
                  min="5"
                  max="120"
                  value={timerPomodoro}
                  onChange={(e) =>
                    dispatch({ type: TIMER_POMODORO, payload: e.target.value })
                  }
                  required
                  className="timer-input txt-center px-2 py-5 mt-5"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: INC_TIMER_POMODORO });
                  }}
                  className="btn-timer py-5 px-9 mt-5 ml-5">
                  <i className="fas fa-caret-up"></i>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: DEC_TIMER_POMODORO });
                  }}
                  className="btn-timer py-5 px-9 mt-5 ml-5">
                  <i className="fas fa-caret-down"></i>
                </button>
              </div>
            </div>
            <div className="break-container display-flex gap-2 mt-9">
              <div className="break-timer">
                <label
                  htmlFor="pomodoro-timer"
                  className="txt-semibold color-text-gray">
                  Short break
                </label>
                <div className="display-flex">
                  <input
                    type="number"
                    id="pomodoro-timer"
                    min="10"
                    max="120"
                    value={timerShort}
                    onChange={(e) =>
                      dispatch({ type: TIMER_SHORT, payload: e.target.value })
                    }
                    required
                    className="timer-input txt-center px-2 py-5 mt-5"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch({ type: INC_TIMER_SHORT });
                    }}
                    className="btn-timer py-5 px-9 mt-5 ml-5">
                    <i className="fas fa-caret-up"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch({ type: DEC_TIMER_SHORT });
                    }}
                    className="btn-timer py-5 px-9 mt-5 ml-5">
                    <i className="fas fa-caret-down"></i>
                  </button>
                </div>
              </div>{" "}
              <div className="break-timer">
                <label
                  htmlFor="pomodoro-timer"
                  className="txt-semibold color-text-gray">
                  Long break
                </label>
                <div className="display-flex">
                  <input
                    type="number"
                    id="pomodoro-timer"
                    min="5"
                    max="120"
                    value={timerLong}
                    onChange={(e) =>
                      dispatch({ type: TIMER_LONG, payload: e.target.value })
                    }
                    required
                    className="timer-input txt-center px-2 py-5 mt-5"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch({ type: INC_TIMER_LONG });
                    }}
                    className="btn-timer py-5 px-9 mt-5 ml-5">
                    <i className="fas fa-caret-up"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch({ type: DEC_TIMER_LONG });
                    }}
                    className="btn-timer py-5 px-9 mt-5 ml-5">
                    <i className="fas fa-caret-down"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer display-flex align-items-center mt-9 gap-1">
            <button
              onClick={() => setModal((modal) => !modal)}
              className="btn-modal-cta btn-cancel txt-semibold px-11 py-7 ml-auto">
              Cancel
            </button>
            <button
              type="submit"
              className="btn-modal-cta btn-submit txt-semibold px-11 py-7">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { Modal };
