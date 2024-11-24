export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
} export interface TaskFormValues{
    title: string;
    description: string;
    completed: boolean;
}
