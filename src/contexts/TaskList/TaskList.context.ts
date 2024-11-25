import { createContext } from "react";
import { ITaskListContext } from "./TaskList.types";

const TaskListContext = createContext<ITaskListContext | null>(null);

export default TaskListContext;
