import { useState } from "react";
import styles from "./header-nav.module.scss";
import TaskListPopup from "../task-list-popup/task-list-popup";

const TaskHeader = () => {
  const [showTaskListPopup, setShowTaskListPopup] = useState<boolean>(false);
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
        <TaskListPopup onClose={() => setShowTaskListPopup(false)} />
      )}
    </>
  );
};

export default TaskHeader;
