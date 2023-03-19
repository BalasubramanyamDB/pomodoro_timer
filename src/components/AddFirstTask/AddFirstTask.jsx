import React from "react";
import { Modal } from "../Modal/Modal";
import { useModal } from "../../context";
import "./AddFirstTask.css";
import { deleteLocalStorage } from "../../utils/localStorage";
function AddFirstTask() {
  const { modal, setModal } = useModal();
  const addTaskHandler = () => {
    deleteLocalStorage("EditTask");
    setModal((modal) => !modal);
  };
  return (
    <div className="first-task-wrapper display-flex flex-col justify-content-center align-items-center gap-1">
      <h2 className="txt-white m-0">Add Task</h2>
      <button
        onClick={addTaskHandler}
        className="txt-white txt-lg btn-task-large">
        <i className="fas fa-plus-circle"></i>
      </button>
      {modal && <Modal />}
    </div>
  );
}

export { AddFirstTask };
