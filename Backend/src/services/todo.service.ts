import { TodolistEntity } from "../entities";
import { AppDataSouce } from "../db";

export const getAllTodoList = async () => {
  const userRepository = AppDataSouce.getRepository(TodolistEntity);
  const findUser = await userRepository.find({});

  if (!findUser) return null;
  return findUser;
};

export const createTodoList = async (data) => {
  const { title, description, status, date } = data;
  const todoRepository = AppDataSouce.getRepository(TodolistEntity);
  const todoItem = todoRepository.create({ title, description, status, date });
  await todoRepository.save(todoItem);

  return todoItem;
};

export const updateTodoList = async (data) => {
  const { selId, title, description, status, date } = data;
  const todoRepository = AppDataSouce.getRepository(TodolistEntity);

  try {
    const todoItem = await todoRepository.findOne({ where: { uuid: selId } });

    if (!todoItem) {
      throw new Error("Todo item not found");
    }

    todoItem.title = title ?? todoItem.title;
    todoItem.description = description ?? todoItem.description;
    todoItem.status = status ?? todoItem.status;
    todoItem.date = date ?? todoItem.date;

    await todoRepository.save(todoItem);

    return todoItem;
  } catch (error) {
    console.error("Error updating todo list:", error);
    throw error;
  }
};

export const delTodoList = async (data) => {
  const { selId } = data;
  const todoRepository = AppDataSouce.getRepository(TodolistEntity);

  try {
    const todoItem = await todoRepository.findOne({ where: { uuid: selId } });

    if (!todoItem) {
      throw new Error("Todo item not found");
    }

    // Delete the item
    await todoRepository.remove(todoItem);

    return todoItem;
  } catch (error) {
    console.error("Error deleting todo list:", error);
    throw error;
  }
};
