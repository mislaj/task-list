import { useContext } from "react";
import TaskListContext from "./TaskList.context";
import { ITaskListContext } from "./TaskList.types";

const useTaskList = (): ITaskListContext => {
  const context = useContext(TaskListContext);

  if (!context) {
    throw new Error("useTaskList must be used within a TaskListProvider");
  }

  return context;
};

export default useTaskList;
