import { Task } from "../../types/task";

export interface ITaskListContext {
  isLoading: boolean;
  tasks: Task[];
  actions: {
    addTask: (task: Task) => void;
    editTask: (task: Task) => void;
    removeTask: (id: number) => void;
    toggleTask: (id: number) => void;
  };
}

export type ITaskListAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "EDIT_TASK"; payload: Task }
  | { type: "REMOVE_TASK"; payload: number }
  | { type: "TOGGLE_TASK"; payload: number };

export interface ITaskListProvider {
  data: Omit<ITaskListContext, "actions">;
  children: React.ReactNode;
}
