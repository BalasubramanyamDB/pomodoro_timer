import React from "react";
import { useModal, useTask } from "../../context";
import { deleteLocalStorage } from "../../utils/localStorage";
import { Modal } from "../Modal/Modal";
import { Task } from "../Task/Task";
import "./ShowAllTasks.css";

function ShowAllTasks() {
  const { task: tasks } = useTask();
  const { modal, setModal } = useModal();

  return (
    <div className="showAllTasks-wrapper display-flex height-100 width-100 flex-col p-9">
      <div className="showTask-title display-flex justify-content-between align-items-center">
        <h2 className="m-0 txt-white ">Todo's</h2>
        <button
          onClick={() => {
            deleteLocalStorage("EditTask");
            setModal((modal) => !modal);
          }}
          className="p-5 txt-white ml-auto txt-lg">
          <i className="fas fa-plus-circle"></i>
        </button>
      </div>
      <div className="show-task pr-9">
        {tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
      {modal && <Modal />}
    </div>
  );
}

export { ShowAllTasks };
