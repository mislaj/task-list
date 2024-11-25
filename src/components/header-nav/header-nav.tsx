import { useState } from "react";
import styles from "./header-nav.module.scss";
import TaskListPopup from "../task-list-popup/task-list-popup";
import TaskListProvider from "../../contexts/TaskList/TaskList.provider";
import useTaskData from "../../hooks/useTasks/useTasks";

const TaskHeader = () => {
  const [showTaskListPopup, setShowTaskListPopup] = useState<boolean>(false);
  const { tasks, isLoading } = useTaskData();

  return (
    <>
      <header className={styles.taskHeader}>
        <div className={styles.container}>
          <div className={styles.title}>Task list</div>
          <button
            className={styles.button}
            aria-label="Open Tasklist Pop Up"
            onClick={() => setShowTaskListPopup(true)}
          >
            Tasklist Pop Up
          </button>
        </div>
      </header>
      {showTaskListPopup && (
        <TaskListProvider data={{ tasks, isLoading }}>
          <TaskListPopup onClose={() => setShowTaskListPopup(false)} />
        </TaskListProvider>
      )}
    </>
  );
};

export default TaskHeader;
