import { useState } from "react";
import DialogTodoItem from "./DialogTodoItem";

const Header = ({ handleSubmit, sortHandler }) => {
  // State to handle dialog visibility
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 justify-between sm:flex-row w-2/4">
      {/* Button to open the add item dialog */}
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-md px-5 py-2"
      >
        Add Item
      </button>

      {/* Dropdown for sorting tasks */}
      <select
        onChange={(e) => sortHandler(e.target.value)}
        className="bg-gray-300 rounded-lg font-medium text-gray-600 px-4 py-2"
      >
        <option value="All">All</option>
        <option value="Incomplete">Incomplete</option>
        <option value="Complete">Complete</option>
      </select>

      {/* Dialog for adding a new task */}
      {open && (
        <DialogTodoItem
          mode="add"
          open={open}
          setOpen={setOpen}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Header;
