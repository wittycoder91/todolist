import React, { useContext } from "react";
import Task from "./TodoItem";
import { ThemeContext } from "../pages/home";

function Todos({ tasks, deleteHandler, editeHandler }) {
  const { theme } = useContext(ThemeContext); // Access theme context

  return (
    <div
      className={`w-3/4 p-4 rounded-lg ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {tasks?.length > 0 ? (
        tasks.map((task, i) => (
          <Task
            key={i}
            task={task}
            deleteHandler={deleteHandler}
            editeHandler={editeHandler}
          />
        ))
      ) : (
        <div className="flex flex-col items-center w-full bg-gray-300 font-medium rounded p-2">
          No Todo Found!
        </div>
      )}
    </div>
  );
}

export default Todos;
