import {
  ADD_TASK,
  SAVE_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_CHECKED,
  TOGGLE_TIMER_START,
  TIME_REMAINING,
  RESET_TIMER,
  SWITCH_TAB,
} from "../constants";
import { v4 as uuid } from "uuid";
export const taskReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TASK:
      return [...state, { id: uuid(), ...payload }];
    case SAVE_TASK:
      return [...state, ...payload];
    case EDIT_TASK:
      return state.map((task) => {
        if (task.id === payload.id) {
          return { ...payload };
        } else {
          return task;
        }
      });
    case DELETE_TASK:
      return state.filter(({ id }) => id !== payload);
    case TOGGLE_CHECKED:
      return state.map((task) => {
        if (task.id === payload.id) {
          return { ...payload, isChecked: !payload.isChecked };
        } else {
          return task;
        }
      });
    case TOGGLE_TIMER_START:
      const updatedTask = {
        ...payload,
        hasTimerStarted: !payload.hasTimerStarted,
        isTimerPaused: !payload.isTimerPaused,
      };
      const updateAllTasks = state.map((task) =>
        task.id === payload.id ? updatedTask : task
      );
      return [...updateAllTasks];

    case TIME_REMAINING:
      const updatedTime = state.map((task) => {
        if (task.id === payload.id) {
          return { ...task, timeRemaining: payload.timeRemaining };
        } else {
          return task;
        }
      });
      return [...updatedTime];

    case RESET_TIMER:
      const resetTimer = state.map((task) => {
        if (task.id === payload.id) {
          return {
            ...task,
            hasTimerStarted: false,
            timeRemaining: Number(payload.timerPomodoro) * 60,
            isTimerPaused: true,
          };
        } else {
          return task;
        }
      });
      return [...resetTimer];

    case SWITCH_TAB:
      const switchTabTask = state.map((task) => {
        if (task.id === payload.id) {
          return {
            ...task,
            tab: payload.tab,
          };
        } else {
          return task;
        }
      });
      return [...switchTabTask];
    default:
      return { ...state };
  }
};
