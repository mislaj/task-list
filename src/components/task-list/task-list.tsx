import TaskListItem from "../task-list-item/task-list-item";
import styles from "./task-list.module.scss";
const TaskList=()=>{
    return(
<div className={styles.root}>
    <div>
    <div className={styles.listHeader}> 
    Lorem ipsum dolor sit amet consectetur. Eros libero.
    </div>
    <div className={styles.listSubHeader}> 
    Lorem ipsum dolor sit amet consectetur. Eros libero.
    </div>
    <TaskListItem/>
    </div>
    <img src="../../../public/image_1.png" alt="Example Image"  />
</div>
    )
}
export default TaskList;
