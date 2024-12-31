import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { v4 as uuid } from "uuid";

const DialogTodoItem = ({ mode, open, setOpen, handleSubmit, taskEdited }) => {
  // Generate unique ID for tasks
  let id = uuid();

  const [task, setTask] = useState({
    _id: id,
    title: "",
    description: "",
    status: false,
    date: dayjs("2018-08-18T21:11:54"),
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
  });

  // Load the task to be edited
  useEffect(() => {
    if (mode === "edit") {
      setTask({
        ...taskEdited,
      });
    }
  }, [mode, taskEdited]);

  // Update task details
  const handleChangeTask = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (typeof value === "string" && value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // Validation check
  const validateFields = () => {
    const newErrors = {
      title: !task.title.trim(),
      description: !task.description.trim(),
    };
    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const submitHandler = () => {
    if (!validateFields()) return;

    handleSubmit(task);
    setOpen(false);

    // Reset the task form
    setTask({
      _id: "",
      title: "",
      description: "",
      status: false,
      date: dayjs("2018-08-18T21:11:54"),
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>{mode === "add" ? "Add" : "Edit"} Item</DialogTitle>
      <DialogContent className="my-2 ">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            "& .MuiTextField-root": { my: 2.5 },
          }}
        >
          {/* Task title input */}
          <TextField
            name="title"
            autoFocus
            label="Title"
            type="text"
            fullWidth
            value={task.title}
            onChange={handleChangeTask}
            required
            error={errors.title}
            helperText={errors.title ? "Title is required" : ""}
          />
          {/* Task description input */}
          <TextField
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={task.description}
            onChange={handleChangeTask}
            required
            error={errors.description}
            helperText={errors.description ? "Description is required" : ""}
          />
          {/* Task status dropdown */}
          <TextField
            name="status"
            select
            label="Status"
            fullWidth
            value={task.status}
            onChange={handleChangeTask}
            required
          >
            <MenuItem value={false}>Incomplete</MenuItem>
            <MenuItem value={true}>Completed</MenuItem>
          </TextField>
          {/* Date and time picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date & Time Picker"
              value={task.date}
              onChange={(e) => setTask((prev) => ({ ...prev, date: e }))}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <button
          onClick={() => setOpen(false)}
          className="bg-gray-300 hover:bg-gray-200 text-gray-600 font-medium rounded-md px-5 py-2"
        >
          Cancel
        </button>
        <button
          onClick={submitHandler}
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md px-5 py-2"
        >
          {mode === "add" ? "Add" : "Edit"} Item
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogTodoItem;
