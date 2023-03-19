export const DEFAULT = "DEFAULT";
export const DARK = "DARK";
export const BLUE = "BLUE";
export const DARK_BLUE = "DARK_BLUE";
export const INITIAL_TASK_STATE = {
  taskName: "",
  taskDescription: "",
  timerPomodoro: "25",
  timerShort: "5",
  timerLong: "30",
  isChecked: false,
  hasTimerStarted: false,
  get timeRemaining() {
    return Number(this.timerPomodoro) * 60;
  },
  isTimerPaused: false,
  tab: "FOCUS",
};
export const TASK_NAME = "TASK_NAME";
export const TASK_DESCRIPTION = "TASK_DESCRIPTION";
export const TIMER_POMODORO = "TIMER_POMODORO";
export const TIMER_SHORT = "TIMER_SHORT";
export const TIMER_LONG = "TIMER_LONG";
export const INC_TIMER_POMODORO = "INC_TIMER_POMODORO";
export const INC_TIMER_SHORT = "INC_TIMER_SHORT";
export const INC_TIMER_LONG = "INC_TIMER_LONG";
export const DEC_TIMER_POMODORO = "DEC_TIMER_POMODORO";
export const DEC_TIMER_SHORT = "DEC_TIMER_SHORT";
export const DEC_TIMER_LONG = "DEC_TIMER_LONG";
export const ADD_TASK = "ADD_TASK";
export const SAVE_TASK = "SAVE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_CHECKED = "TOGGLE_CHECKED";
export const TOGGLE_TIMER_START = "TOGGLE_TIMER_START";
export const TIME_REMAINING = "TIME_REMAINING";
export const RESET_TIMER = "RESET_TIMER";
export const FOCUS = "FOCUS";
export const SHORT_BREAK = "SHORT_BREAK";
export const LONG_BREAK = "LONG_BREAK";
export const SWITCH_TAB = "SWITCH_TAB";
