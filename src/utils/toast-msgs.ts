import { toast } from "react-toastify";

export const deleteToast = () => toast("Task deleted successfully")
export const addToast = () => toast("Task added successfully")
export const editToast = () => toast("Task updated successfully")
export const errorToast = () => toast.error("Something went wrong")
export const completedToast = () => toast("Task marked as completed")