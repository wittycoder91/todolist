import { Router } from "express";
import { TodoController } from "../controllers";

export const todoRouter = Router();

todoRouter.get("/getalltodolist", TodoController.getTodoList);
todoRouter.post("/addTodoList", TodoController.AddTodoItem);
todoRouter.post("/updateTodoList", TodoController.updateTodoItem);
todoRouter.post("/delTodoList", TodoController.delTodoItem);
