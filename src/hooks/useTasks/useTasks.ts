import { useCallback, useEffect, useState } from "react";
import { Task } from "../../types/task";
import axios from "axios";

const MOCK_API_URL = `${window.location.origin}/db.json`;



export default function useTaskData() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get<{tasks:Task[]}>(MOCK_API_URL);
      setTasks(response.data.tasks);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, isLoading };
}
