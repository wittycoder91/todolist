import { useState, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DialogTodoItem from "./DialogTodoItem";
import { ThemeContext } from "../pages/home";

const Task = ({ task, deleteHandler, editeHandler }) => {
  const { theme } = useContext(ThemeContext);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div
      className={`flex items-start justify-between bg-white rounded-md px-3 w-full my-2 py-4 shadow-sm ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Display task details */}
      <div className="flex-1 flex flex-col mx-3">
        <span className={`font-medium ${task.status && "line-through"} `}>
          {task.title}
        </span>
        <span className={`font-medium ${task.status && "line-through"} `}>
          {task.description}
        </span>
        <span className="text-xs ">{new Date(task.date).toLocaleString()}</span>
      </div>
      {/* Action buttons */}
      <div>
        <button
          onClick={() => deleteHandler(task.uuid)}
          className="bg-gray-200 rounded-md p-1 mr-2"
        >
          <DeleteIcon color="action" fontSize="small" />
        </button>
        <button
          onClick={() => setOpenEdit(true)}
          className="bg-gray-200 rounded-md p-1"
        >
          <EditIcon color="action" fontSize="small" />
        </button>
      </div>
      {/* Edit dialog */}
      {openEdit && (
        <DialogTodoItem
          mode="edit"
          open={openEdit}
          setOpen={setOpenEdit}
          handleSubmit={editeHandler}
          taskEdited={task}
        />
      )}
    </div>
  );
};

export default Task;
