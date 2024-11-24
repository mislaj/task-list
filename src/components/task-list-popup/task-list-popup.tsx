// import { useState } from "react";
// import { Task } from "../../types/task";
// import { taskList as initialTaskList } from "../../utils/task-list";
// import CheckBox, { CheckboxVARIANT } from "../check-box/check-box";
// import Dialog from "../dialog/dialog";
// import styles from "./task-list-popup.module.scss";
// interface Props {
//   onClose: () => void;
// }
// const TaskListPopup = ({ onClose }: Props) => {
//   const [tasks, setTasks] = useState<Task[]>(initialTaskList);



//   // Function to handle checkbox change
//   const handleCheckboxChange = (taskId: number) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === taskId ? { ...task, completed: !task.completed } : task
//     );
//     setTasks(updatedTasks);
//   };


//   console.log(tasks, 'tasks');
//   const getContentMarkup = () => {
//     return (
//       <div className={styles.root}>
//         {tasks.map((task: Task) => (
//           <div key={task.id} className={styles.itemWrap}>
//             <CheckBox
//               variant={CheckboxVARIANT.CIRCLE}
//               checked={task.completed}
//               onChange={() => handleCheckboxChange(task.id)}
//             />
//             <div>
//               <div className={styles.title}>{task.title}</div>
//               <div className={styles.desc}>{task.description}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };
//   return (
//     <Dialog
//       open
//       onClose={onClose}
//       maxWidth="lg"
//       contentWrapperClass={styles.contentWrap}
//       dialogTitle={"Task List"}
//     >
//       {getContentMarkup()}
//     </Dialog>
//   );
// };
// export default TaskListPopup;



import { useState, useEffect } from "react";
import axios from "axios"; // For making API calls
import { Task } from "../../types/task";
import CheckBox, { CheckboxVARIANT } from "../check-box/check-box";
import Dialog from "../dialog/dialog";
import styles from "./task-list-popup.module.scss";

interface Props {
  onClose: () => void;
}

const MOCK_API_URL = "http://localhost:3001/tasks";

const TaskListPopup = ({ onClose }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch task list from mock API
   const fetchTasks = async (): Promise<Task[]> => {
    try {
      const response = await axios.get<Task[]>(MOCK_API_URL);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  };

  // Update a task in the mock API
  const updateTask = async (taskId: number, completed: boolean) => {
    try {
      await axios.put(`${MOCK_API_URL}/${taskId}`, { completed });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (taskId: number, currentCompleted: boolean) => {
    updateTask(taskId, !currentCompleted);
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const getContentMarkup = () => {
    if (loading) return <div>Loading tasks...</div>;

    return (
      <div className={styles.root}>
        {tasks.map((task: Task) => (
          <div key={task.id} className={styles.itemWrap}>
            <CheckBox
              variant={CheckboxVARIANT.CIRCLE}
              checked={task.completed}
              onChange={() => handleCheckboxChange(task.id, task.completed)}
            />
            <div>
              <div className={styles.title}>{task.title}</div>
              <div className={styles.desc}>{task.description}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="lg"
      contentWrapperClass={styles.contentWrap}
      dialogTitle={"Task List"}
    >
      {getContentMarkup()}
    </Dialog>
  );
};

export default TaskListPopup;
