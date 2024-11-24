import { Task } from "../../types/task";
import { taskList } from "../../utils/task-list";
import styles from "./task-list-item.module.scss";
import CheckBox, { CheckboxVARIANT } from "../check-box/check-box";
const TaskListItem = () => {
    
  return (
    <div>
      {taskList.map((task:Task) => (
        <div key={task.id} className={styles.itemWrap}>
          <CheckBox variant={CheckboxVARIANT.CIRCLE}/>
          <span className={styles.title}>{task.title}</span>
        </div>
      ))}
    </div>
  );
};
export default TaskListItem;
