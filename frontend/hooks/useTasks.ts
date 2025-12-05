import { useState, useEffect, useCallback } from "react";
import { Task, TaskFormData, Status, SubTask } from "@/constants/types";
import api from "@/services/api";

export function useTasks() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Status | "Pending">("Pending");
  const [sortByAlphabet, setSortByAlphabet] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<Task[]>("/parenttasks");
      console.log("Fetched all tasks:", response.data);
      setAllTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (data: TaskFormData) => {
    try {
      let finalDeadlineTime = data.deadlineTime;
      if (data.deadlineDate && data.deadlineTime) {
        const datePart = new Date(data.deadlineDate);
        const timePart = new Date(data.deadlineTime);
        datePart.setHours(
          timePart.getHours(),
          timePart.getMinutes(),
          timePart.getSeconds()
        );
        finalDeadlineTime = datePart.toISOString();
      }

      await api.post("/parenttasks", {
        title: data.title,
        priority: data.priority,
        label: data.label,
        status: "Pending",
        deadlineDate: data.deadlineDate
          ? new Date(data.deadlineDate).toISOString()
          : null,
        deadlineTime: finalDeadlineTime,
        subTasks: data.subTasks.map((t) => ({ title: t, completed: false })),
      });

      fetchTasks();
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const updateTask = async (id: string, data: Partial<TaskFormData>) => {
    try {
      const payload: any = {};
      if (data.title) payload.title = data.title;
      if (data.priority) payload.priority = data.priority;
      if (data.label) payload.label = data.label;

      if (data.deadlineDate) {
        const date = new Date(data.deadlineDate);
        if (!isNaN(date.getTime())) {
          payload.deadlineDate = date.toISOString();
        }
      }

      if (data.deadlineTime) {
        const time = new Date(data.deadlineTime);
        if (!isNaN(time.getTime())) {
          payload.deadlineTime = time.toISOString();
        }
      }

      await api.put(`/parenttasks/${id}`, payload);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/parenttasks/${id}`);
      setAllTasks(allTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const toggleSubTask = async (taskId: string, subTaskId: string) => {
    const task = allTasks.find((t) => t.id === taskId);
    if (!task) return;
    const subTask = task.subTasks?.find((s) => s.id === subTaskId);
    if (!subTask) return;

    try {
      const updatedStatus = !subTask.completed;
      await api.put(`/subtasks/${subTaskId}`, {
        completed: updatedStatus,
      });

      setAllTasks((prevTasks) =>
        prevTasks.map((t) => {
          if (t.id !== taskId) return t;

          const updatedSubTasks = t.subTasks.map((st) => {
            if (st.id === subTaskId) return { ...st, completed: updatedStatus };
            return st;
          });

          const total = updatedSubTasks.length;
          const completedCount = updatedSubTasks.filter(
            (st) => st.completed
          ).length;
          let newStatus: Status | "Pending" = "Pending";

          if (total > 0 && completedCount === total) {
            newStatus = "Done";
          } else if (completedCount > 0) {
            newStatus = "On going";
          }

          return { ...t, subTasks: updatedSubTasks, status: newStatus };
        })
      );
    } catch (error) {
      console.error("Error toggling subtask", error);
    }
  };

  const toggleExpanded = (id: string) => {
    setAllTasks(
      allTasks.map((task) =>
        task.id === id ? { ...task, isExpanded: !task.isExpanded } : task
      )
    );
  };

  const getFilteredTasks = () => {
    let filtered =
      filter === "Pending"
        ? allTasks.filter((task) => task.status === "Pending")
        : allTasks.filter((task) => task.status === filter);

    if (sortByAlphabet) {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    const priorityOrder = { High: 0, Mid: 1, Low: 2 };
    return [...filtered].sort((a, b) => {
      const pA = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 99;
      const pB = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 99;
      return pA - pB;
    });
  };

  return {
    tasks: getFilteredTasks(), 
    allTasks, 
    filter,
    setFilter,
    sortByAlphabet,
    setSortByAlphabet,
    addTask,
    updateTask,
    deleteTask,
    toggleSubTask,
    toggleExpanded,
    loading,
    refresh: fetchTasks,
  };
}