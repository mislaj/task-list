import clsx from "clsx";
import TaskListItem from "../task-list-item/task-list-item";
import styles from "./task-list.module.scss";
const TaskList = () => {
  return (
    <div className={styles.root}>
      <section className={styles.sectionRoot}>
        <div className={styles.info}>
          <div className={styles.listHeader}>
            Lorem ipsum dolor sit amet consectetur. Eros libero.
          </div>
          <div className={styles.listSubHeader}>
            Lorem ipsum dolor sit amet consectetur. Eros libero.
          </div>
          <TaskListItem />
        </div>
        <img src="/image_1.png" alt="Example Image" className={styles.image}/>
      </section>
      <section className={clsx(styles.sectionRoot, styles.secondSection)}>
        <div className={styles.info}>
          <div className={styles.listHeader}>
            Lorem ipsum dolor sit amet consectetur. Sed sapien.
          </div>
          <div className={styles.listSubHeader}>
            Lorem ipsum dolor sit amet consectetur. Eros libero.
          </div>
          <TaskListItem />
        </div>
        <img src="/image_2.png" alt="Example Image" className={styles.image} />
      </section>
    </div>
  );
};
export default TaskList;
