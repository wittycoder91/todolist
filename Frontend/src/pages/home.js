import axios from "axios";
import React, { useState, useEffect, createContext, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer } from "react-toastify";

import Header from "../components/Header";
import Todos from "../components/Todos";
import {
  showSuccessMsg,
  showWarningMsg,
  showErrorMsg,
} from "../services/common";
import { ReactComponent as LightIcon } from "../assets/images/icon-sun.svg";
import { ReactComponent as DarkIcon } from "../assets/images/icon-moon.svg";

// Create Theme Context
export const ThemeContext = createContext();

function Home() {
  const [open, setOpen] = useState(false);
  const [selID, setSelID] = useState(-1);

  // Todo list states
  const [listTasks, setListTasks] = useState([]);
  const [showListTasks, setShowListTasks] = useState([]);
  const [modeSort, setModeSort] = useState("All");

  // Theme State
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    getTodoList();
  }, []);

  // Filter todo list
  useEffect(() => {
    if (modeSort === "All") {
      setShowListTasks(listTasks);
    } else if (modeSort === "Incomplete") {
      setShowListTasks(listTasks.filter((t) => !t.status));
    } else {
      setShowListTasks(listTasks.filter((t) => t.status));
    }
  }, [listTasks, modeSort]);

  // Apply theme class to body
  useEffect(() => {
    document.body.className =
      theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white";
  }, [theme]);

  // Get the todo list
  const getTodoList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/todo/getalltodolist`,
        {}
      );

      if (response.data.success) {
        setListTasks(response.data.data);
      } else {
        showWarningMsg(
          "An error occurred while retrieving the to-do list data."
        );
      }
    } catch (error) {
      showErrorMsg(error.message);
    }
  };

  // Add the todo list item
  const handleSubmit = async (task) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/todo/addTodoList`,
        {
          title: task.title,
          description: task.description,
          date: task.date,
          status: task.status,
        }
      );

      if (response.data.success) {
        showSuccessMsg("The item has been added successfully.");

        setListTasks((prevTasks) => [...(prevTasks || []), { ...task }]);
      } else {
        showWarningMsg(
          "An error occurred while retrieving the to-do list data."
        );
      }
    } catch (error) {
      showErrorMsg(error.message);
    }
  };

  // Remvoe the todo list item
  const handleDelete = (uuid) => {
    setSelID(uuid);
    handleRemoveOpen();
  };

  // Update the todo list item
  const handleEdit = async (task) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/todo/updateTodoList`,
        {
          selId: task.uuid,
          title: task.title,
          description: task.description,
          date: task.date,
          status: task.status,
        }
      );

      if (response.data.success) {
        showSuccessMsg("The item has been updated successfully.");
        setListTasks(listTasks.map((t) => (t.uuid === task.uuid ? task : t)));
      } else {
        showWarningMsg(
          "An error occurred while retrieving the to-do list data."
        );
      }
    } catch (error) {
      showErrorMsg(error.message);
    }
  };
  const handleSortList = (mode) => {
    setModeSort(mode);
  };

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleRemoveOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemove = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/todo/delTodoList`,
        {
          selId: selID,
        }
      );

      if (response.data.success) {
        setListTasks(listTasks.filter((t) => t.uuid !== selID));
        showSuccessMsg("The item has been removed successfully.");
      } else {
        showWarningMsg(
          "An error occurred while retrieving the to-do list data."
        );
      }
    } catch (error) {
      showErrorMsg(error.message);
    }
    setOpen(false);
    setSelID(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`flex flex-col items-center w-full h-full my-10 gap-6 ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div
          className="absolute right-6 top-[10px] w-[36px] h-[30px] cursor-pointer"
          onClick={handleLogout}
        >
          <img src="/icons/logout.png" alt="" />
        </div>
        <div className="flex items-center justify-center relative w-3/4">
          <h1 className="text-4xl font-bold uppercase">ToDo List</h1>
          <ThemeToggle />
        </div>

        <Header handleSubmit={handleSubmit} sortHandler={handleSortList} />
        <Todos
          tasks={showListTasks}
          deleteHandler={handleDelete}
          editeHandler={handleEdit}
        />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Remove Modal</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to remove the current item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleRemove} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="absolute right-0 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:shadow-lg transition"
    >
      {theme === "light" ? <LightIcon /> : <DarkIcon />}
    </button>
  );
}

export default Home;
