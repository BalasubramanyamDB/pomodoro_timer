import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BLUE,
  DARK_BLUE,
  FOCUS,
  LONG_BREAK,
  RESET_TIMER,
  SHORT_BREAK,
  SWITCH_TAB,
  TIME_REMAINING,
  TOGGLE_TIMER_START,
} from "../../constants";
import { useTask, useTheme } from "../../context";
import { useDocumentTitle } from "../../hooks";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import style from "./Timer.module.css";

function Timer() {
  const { setTheme } = useTheme();
  const { taskId } = useParams();
  const { task, dispatch } = useTask();
  const currentTask = task.filter((task) => task.id === taskId)[0];
  const [hasTimerStarted, setHasTimerStarted] = useState(
    currentTask.hasTimerStarted ?? false
  );
  const {
    id: taskID,
    taskName,
    taskDescription,
    timerPomodoro,
    timeRemaining,
    isTimerPaused,
    timerShort,
    timerLong,
    tab,
  } = currentTask;
  const [activeTab, setActiveTab] = useState(tab);
  const timerRef = useRef();
  const [totalSeconds, setTotalSeconds] = useState(0);

  let minutes = Math.floor(Number(totalSeconds) / 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let seconds = Number(totalSeconds) % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  const totalSecondsRef = useRef(totalSeconds);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (totalSecondsRef.current !== 0) updateTimer();
      else switchPomodoroMode();
    }, 1000);
  };

  const pauseTimer = () => clearInterval(timerRef.current);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    totalSecondsRef.current = 60 * Number(timerPomodoro);
    dispatch({ type: RESET_TIMER, payload: currentTask });
    setTotalSeconds(totalSecondsRef.current);
    setHasTimerStarted(false);
  };

  const updateTimer = () => {
    totalSecondsRef.current--;
    setTotalSeconds(totalSecondsRef.current);
    dispatch({
      type: TIME_REMAINING,
      payload: { id: taskID, timeRemaining: totalSecondsRef.current },
    });
  };

  const switchPomodoroMode = () => {
    activeTab === FOCUS ? setActiveTab(SHORT_BREAK) : setActiveTab(FOCUS);
    resetTimer();
  };

  useEffect(() => {
    setActiveTab(tab);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    hasTimerStarted ? startTimer() : pauseTimer();
  }, [hasTimerStarted]); // eslint-disable-line

  useEffect(() => {
    switch (activeTab) {
      case FOCUS:
        setTheme(getLocalStorage("theme"));
        dispatch({
          type: SWITCH_TAB,
          payload: { id: taskID, tab: FOCUS },
        });
        isTimerPaused || hasTimerStarted
          ? (totalSecondsRef.current = timeRemaining)
          : (totalSecondsRef.current = 60 * Number(timerPomodoro));
        setTotalSeconds(totalSecondsRef.current);
        break;
      case SHORT_BREAK:
        resetTimer();
        setTheme(BLUE);
        dispatch({
          type: SWITCH_TAB,
          payload: { id: taskID, tab: SHORT_BREAK },
        });
        totalSecondsRef.current = Number(timerShort) * 60;
        setTotalSeconds(totalSecondsRef.current);
        break;
      case LONG_BREAK:
        resetTimer();
        setTheme(DARK_BLUE);
        dispatch({
          type: SWITCH_TAB,
          payload: { id: taskID, tab: LONG_BREAK },
        });
        totalSecondsRef.current = Number(timerLong) * 60;
        setTotalSeconds(totalSecondsRef.current);
        break;

      default:
        break;
    }
  }, [activeTab]); // eslint-disable-line
  useEffect(() => {
    setLocalStorage("task", task);
  }, [task]);

  //   Update document title
  useDocumentTitle(
    `${`${minutes}:${seconds} | ${activeTab === FOCUS ? `FOCUS` : `BREAK`}`}`
  );

  return (
    <div
      className={`${style.timer_wrapper} display-flex flex-col gap-1 justify-content-center mx-auto my-9`}>
      <div
        className={`${style.timer_container} mx-auto p-9 display-flex flex-col align-items-center`}>
        <div className={`${style.timer_tabs} display-flex gap-1 `}>
          <button
            onClick={() => setActiveTab(FOCUS)}
            className={`${style.btn_tab} ${
              activeTab === FOCUS && style.active_tab
            } txt-semibold txt-white px-8 py-4`}>
            Pomodoro
          </button>
          <button
            onClick={() => setActiveTab(SHORT_BREAK)}
            className={`${style.btn_tab} ${
              activeTab === SHORT_BREAK && style.active_tab
            } txt-semibold txt-white px-8 py-4`}>
            Short Break
          </button>
          <button
            onClick={() => setActiveTab(LONG_BREAK)}
            className={`${style.btn_tab} ${
              activeTab === LONG_BREAK && style.active_tab
            } txt-semibold txt-white px-8 py-4`}>
            Long Break
          </button>
        </div>
        <div className={`display-flex justify-content-center m-9`}>
          <span className={style.timer}>
            {minutes}:{seconds}
          </span>
        </div>
        <div className="display-flex gap-1 align-items-center justify-content-center">
          <button
            className={`${style.btn_timer} px-10 py-6 txt-bold`}
            onClick={() => {
              dispatch({ type: TOGGLE_TIMER_START, payload: currentTask });
              setHasTimerStarted((timer) => !timer);
            }}>
            {hasTimerStarted ? `Pause` : `Start`}
          </button>

          <button
            className={`${style.btn_timer} px-8 py-4 txt-bold`}
            onClick={() => {
              resetTimer();
              setActiveTab(FOCUS);
            }}>
            <i className="fas fa-stop-circle txt-lg"></i>
          </button>
        </div>
      </div>
      <div
        className={`${style.task_info} display-flex flex-col gap-1 align-items-center justify-content-center`}>
        <div
          className={`${style.task} txt-white width-100 display-flex gap-1 justify-content-start align-items-center`}>
          <span className={`${style.task_title} px-9 py-5`}>Task</span>
          <span className={`${style.task_name} px-9 py-5 txt-semibold`}>
            {taskName}
          </span>
        </div>
        <div className={`${style.task} txt-white display-flex width-100`}>
          <span className={`${style.task_description} px-9 py-5 txt-semibold`}>
            {taskDescription}
          </span>
        </div>
      </div>
    </div>
  );
}

export { Timer };
