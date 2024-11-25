import { useMemo, useReducer } from "react";
import TaskListContext from "./TaskList.context";
import {
  ITaskListAction,
  ITaskListContext,
  ITaskListProvider,
} from "./TaskList.types";
import { Task } from "../../types/task";

const reducer = (
  state: Omit<ITaskListContext, "actions">,
  action: ITaskListAction
): Omit<ITaskListContext, "actions"> => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      return state;
  }
};

const TaskListProvider = ({ children, data }: ITaskListProvider) => {
  const [state, dispatch] = useReducer(reducer, data);

  const valueMemo = useMemo(
    () => ({
      ...state,
      actions: {
        addTask: (task: Task) => dispatch({ type: "ADD_TASK", payload: task }),
        editTask: (task: Task) =>
          dispatch({ type: "EDIT_TASK", payload: task }),
        removeTask: (id: number) =>
          dispatch({ type: "REMOVE_TASK", payload: id }),
        toggleTask: (id: number) =>
          dispatch({ type: "TOGGLE_TASK", payload: id }),
      },
    }),
    [state]
  );

  return (
    <TaskListContext.Provider value={valueMemo}>
      {children}
    </TaskListContext.Provider>
  );
};

export default TaskListProvider;
