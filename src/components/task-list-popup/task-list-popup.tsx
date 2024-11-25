import { useState, useEffect } from "react";
import { Task, TaskFormValues } from "../../types/task";
import CheckBox, { CheckboxVARIANT } from "../check-box/check-box";
import Dialog from "../dialog/dialog";
import styles from "./task-list-popup.module.scss";
import TaskAddForm from "../task-add-form/task-add-form";
import useTaskList from "../../contexts/TaskList/useTaskList";
import { DeleteIcon } from "../../assets/icons/icons";
import { addToast, completedToast, deleteToast, editToast } from "../../utils/toast-msgs";

interface Props {
  onClose: () => void;
}

const TaskListPopup = ({ onClose }: Props) => {
  const [showAddTaskPopup, setShowAddTaskPopup] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const { tasks, isLoading, actions } = useTaskList();

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowAddTaskPopup(true);
  };

  const onAddOrUpdateTask = async (task: TaskFormValues) => {
    if (editingTask) {
      actions.editTask(task);
      editToast();
    } else {
      actions.addTask(task);
      addToast();
    }
    setEditingTask(null);
    setShowAddTaskPopup(false);
    applyFilter(filter);
  };

  const onDeleteTask=async(taskId:number)=>{
    actions.removeTask(taskId);
    applyFilter(filter);
    deleteToast()
  }

  // Handle checkbox toggle
  const handleCheckboxChange = (taskId: number) => {
    actions.toggleTask(taskId);
    completedToast();
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
  
  useEffect(() => {
    applyFilter(filter); // Reapply filter whenever tasks change
  }, [tasks]);

  const getContentMarkup = () => {
    if (isLoading) return <div>Loading tasks...</div>;

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
            >
              <div
              >
                <CheckBox
                  variant={CheckboxVARIANT.CIRCLE}
                  checked={task.completed}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    handleCheckboxChange(task.id);
                  }}
                />
              </div>
              <div className={styles.infoWrap}  onClick={() => handleEditTask(task)}>
                <div className={styles.title}>{task.title}</div>
                <div className={styles.desc}>{task.description}</div>
              </div>
              <div className={styles.deleteIcon} onClick={()=>{onDeleteTask(task.id)}}><DeleteIcon/></div>
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
