import { useFormik } from "formik";
import styles from "./task-add-form.module.scss";
import Dialog from "../dialog/dialog";
import { Textarea } from "../textarea/textarea";
import Input from "../input/input";
import { TaskFormValues } from "../../types/task";



interface Props {
  onClose: () => void;
  onAddTask?: (data: TaskFormValues) => void;
  initialData?: TaskFormValues | null;
}

const TaskAddForm = ({ onClose, onAddTask, initialData }: Props) => {
  const handleSubmit = async (values: TaskFormValues) => {
    onAddTask?.(values)
  };

  const formik = useFormik<TaskFormValues>({
    initialValues: initialData || {id:Date.now(), title: "", description: "", completed: false },
    onSubmit: handleSubmit,
  });

  const getContentMarkup = () => {
    return (
      <div className={styles.container}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <Input
              name="title"
              type="text"
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className={styles.input}
              size="s"
              required
            />
          
          <div className={styles.inputGroup}>
            <Textarea
              name="description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className={styles.textarea}
              required
            ></Textarea>
          </div>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.addButton}>
              Add
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      dialogTitle={"Add Task"}
      contentWrapperClass={styles.contentWrap}
    >
      {getContentMarkup()}
    </Dialog>
  );
};

export default TaskAddForm;
