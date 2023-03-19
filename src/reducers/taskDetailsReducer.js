import {
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
} from "../constants";
export const taskDetailsReducer = (state, { type, payload }) => {
  switch (type) {
    case TASK_NAME:
      return { ...state, taskName: payload };
    case TASK_DESCRIPTION:
      return { ...state, taskDescription: payload };
    case TIMER_POMODORO:
      return {
        ...state,
        timerPomodoro: payload,
        timeRemaining: Number(payload) * 60,
      };
    case TIMER_SHORT:
      return { ...state, timerShort: payload };
    case TIMER_LONG:
      return { ...state, timerLong: payload };
    case INC_TIMER_POMODORO:
      return Number(state.timerPomodoro) < 120
        ? {
            ...state,
            timerPomodoro: Number(state.timerPomodoro) + 1,
            timeRemaining: Number(state.timerPomodoro) * 60,
          }
        : { ...state };
    case DEC_TIMER_POMODORO:
      return Number(state.timerPomodoro) > 5
        ? {
            ...state,
            timerPomodoro: Number(state.timerPomodoro) - 1,
            timeRemaining: Number(state.timerPomodoro) * 60,
          }
        : { ...state };
    case INC_TIMER_SHORT:
      return Number(state.timerShort) < 30
        ? {
            ...state,
            timerShort: Number(state.timerShort) + 1,
          }
        : { ...state };
    case DEC_TIMER_SHORT:
      return Number(state.timerShort) > 5
        ? {
            ...state,
            timerShort: Number(state.timerShort) - 1,
          }
        : { ...state };
    case INC_TIMER_LONG:
      return Number(state.timerLong) < 60
        ? {
            ...state,
            timerLong: Number(state.timerLong) + 1,
          }
        : { ...state };
    case DEC_TIMER_LONG:
      return Number(state.timerLong) > 5
        ? {
            ...state,
            timerLong: Number(state.timerLong) - 1,
          }
        : { ...state };

    default:
      return { ...state };
  }
};
