import { useState, useEffect, useCallback } from "react";
import axios from "axios"; // For making API calls
import { Task, TaskFormValues } from "../../types/task";
import CheckBox, { CheckboxVARIANT } from "../check-box/check-box";
import Dialog from "../dialog/dialog";
import styles from "./task-list-popup.module.scss";
import TaskAddForm from "../task-add-form/task-add-form";

interface Props {
  onClose: () => void;
}

const MOCK_API_URL = "http://localhost:3001/tasks";

const TaskListPopup = ({ onClose }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddTaskPopup, setShowAddTaskPopup] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");

  //   Fetch task list from mock API
  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get<Task[]>(MOCK_API_URL);
      setLoading(false);
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  }, []);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowAddTaskPopup(true);
  };

  //   const onAddTask = async (newTask: TaskFormValues) => {
  //     setTasks((prevTasks) => [newTask, ...prevTasks]);
  //     setShowAddTaskPopup(false)
  //   }
  const onAddOrUpdateTask = async (task: TaskFormValues) => {
    if (editingTask) {
      // Update task
      try {
        const updatedTask = { ...editingTask, ...task };
        console.log("updatedTask", updatedTask);
        // await axios.put(`${MOCK_API_URL}/${editingTask.id}`, updatedTask);
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === editingTask.id ? updatedTask : t))
        );
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      // Add new task
      const newTask = { ...task, id: Date.now(), completed: false }; // Mock ID
      try {
        await axios.post(MOCK_API_URL, newTask);
        setTasks((prevTasks) => [newTask, ...prevTasks]);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
    setEditingTask(null);
    setShowAddTaskPopup(false);
    applyFilter(filter);
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (
    taskId: number | undefined,
    currentCompleted: boolean
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !currentCompleted } : task
    );

    setTasks(updatedTasks);
    axios.put(`${MOCK_API_URL}/${taskId}`, { completed: !currentCompleted });
    applyFilter(filter); // Reapply filter after updating task
  };
  //filter
  const applyFilter = (filterValue: string) => {
    setFilter(filterValue);
    if (filterValue === "all") {
      setFilteredTasks(tasks);
    } else if (filterValue === "completed") {
      setFilteredTasks(tasks.filter((task) => task.completed));
    } else if (filterValue === "active") {
      setFilteredTasks(tasks.filter((task) => !task.completed));
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);
  useEffect(() => {
    applyFilter(filter); // Reapply filter whenever tasks change
  }, [tasks]);

  const getContentMarkup = () => {
    if (loading) return <div>Loading tasks...</div>;

    return (
      <div className={styles.root}>
        <div className={styles.btnWrap}>
          <select
            value={filter}
            onChange={(e) => applyFilter(e.target.value)}
            className={styles.selectBox}
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed Tasks</option>
            <option value="active">Active Tasks</option>
          </select>
          <button
            className={styles.button}
            onClick={() => {
              setShowAddTaskPopup(true);
            }}
          >
            Add New Task
          </button>
        </div>
        {filteredTasks.length ? (
          filteredTasks.map((task: Task) => (
            <div
              key={task.id}
              className={styles.itemWrap}
              onClick={() => handleEditTask(task)}
            >
              <div
              //   onClick={(e: any) => {
              //     e.stopPropagation();
              //     e.preventDefault();
              //   }}
              >
                <CheckBox
                  variant={CheckboxVARIANT.CIRCLE}
                  checked={task.completed}
                  onChange={(e: any) => {
                    handleCheckboxChange(task.id, task.completed);
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                />
              </div>
              <div>
                <div className={styles.title}>{task.title}</div>
                <div className={styles.desc}>{task.description}</div>
              </div>
            </div>
          ))
        ) : (
          <div>No tasks found</div>
        )}
      </div>
    );
  };

  return (
    <>
      <Dialog
        open
        onClose={onClose}
        maxWidth="lg"
        contentWrapperClass={styles.contentWrap}
        dialogTitle={"Task List"}
      >
        {getContentMarkup()}
      </Dialog>
      {showAddTaskPopup && (
        <TaskAddForm
          onClose={() => {
            setShowAddTaskPopup(false);
          }}
          onAddTask={onAddOrUpdateTask}
          initialData={editingTask}
        />
      )}
    </>
  );
};

export default TaskListPopup;
