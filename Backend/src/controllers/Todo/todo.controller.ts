import { todoService } from "../../services";
import httpStatus from "http-status";

export const getTodoList = async (req, res) => {
  try {
    const todoList = await todoService.getAllTodoList();

    if (!todoList || todoList.length === 0) {
      return res
        .status(httpStatus.OK)
        .json({ success: true, message: "No todo items found" });
    }

    return res.status(httpStatus.OK).json({ success: true, data: todoList });
  } catch (error) {
    console.error("Error in getTodoList:", error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const AddTodoItem = async (req, res) => {
  try {
    const { title, description, status, date } = req.body;

    const addItem = await todoService.createTodoList({
      title,
      description,
      status,
      date,
    });

    return res
      .status(httpStatus.CREATED)
      .json({ success: true, data: addItem });
  } catch (error) {
    console.error("Error in AddTodoItem:", error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateTodoItem = async (req, res) => {
  try {
    const { selId, title, description, status, date } = req.body;

    if (!selId) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ success: false, message: "selId is required" });
    }

    const updateItem = await todoService.updateTodoList({
      selId,
      title,
      description,
      status,
      date,
    });

    if (!updateItem) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ success: false, message: "Todo item not found" });
    }

    return res.status(httpStatus.OK).json({ success: true, data: updateItem });
  } catch (error) {
    console.error("Error in updateTodoItem:", error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const delTodoItem = async (req, res) => {
  try {
    const { selId } = req.body;

    const delItem = await todoService.delTodoList({
      selId,
    });

    return res.status(httpStatus.OK).json({ success: true, data: delItem });
  } catch (error) {
    console.error("Error in delTodoItem:", error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal Server Error" });
  }
};
