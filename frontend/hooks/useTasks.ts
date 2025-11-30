import { useState } from "react";
import { Task, TaskFormData, Status } from "@/constants/types";

// Dummy data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Task Parent 1",
    priority: "High",
    label: "Kerja",
    status: "Pending",
    createdAt: new Date().toISOString(),
    subTasks: [
      {
        id: "1-1",
        title: "Hi I am subtask 1, my papa is taskparent 1",
        completed: false,
      },
      {
        id: "1-2",
        title: "Hi I am subtask 2, my mama is taskparent 1. I'm from italy",
        completed: false,
      },
    ],
    deadlineDate: "2025/03/12",
    deadlineTime: "12:30 PM",
  },
  {
    id: "2",
    title: "Task Parent 2",
    priority: "Low",
    label: "Daily",
    status: "On going",
    createdAt: new Date().toISOString(),
    subTasks: [
      {
        id: "2-1",
        title: "Hi I am subtask 1, my papa is taskparent 2",
        completed: false,
      },
    ],
  },
  {
    id: "3",
    title: "Task Parent 3",
    priority: "Mid",
    label: "",
    status: "Pending",
    createdAt: new Date().toISOString(),
    subTasks: [
      {
        id: "3-1",
        title: "Hi I am subtask 1, my papa is taskparent 1",
        completed: false,
      },
    ],
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Status | "Pending">("Pending");
  const [sortByAlphabet, setSortByAlphabet] = useState(false);

  const addTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      priority: data.priority,
      label: data.label,
      status: "Pending",
      subTasks: data.subTasks.map((title, index) => ({
        id: `${Date.now()}-${index}`,
        title,
        completed: false,
      })),
      deadlineDate: data.deadlineDate,
      deadlineTime: data.deadlineTime,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const updateTask = (id: string, data: Partial<TaskFormData>) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: data.title || task.title,
            priority: data.priority || task.priority,
            label: data.label !== undefined ? data.label : task.label,
            subTasks: data.subTasks
              ? data.subTasks.map((title, index) => ({
                  id: task.subTasks[index]?.id || `${Date.now()}-${index}`,
                  title,
                  completed: task.subTasks[index]?.completed || false,
                }))
              : task.subTasks,
            deadlineDate:
              data.deadlineDate !== undefined
                ? data.deadlineDate
                : task.deadlineDate,
            deadlineTime:
              data.deadlineTime !== undefined
                ? data.deadlineTime
                : task.deadlineTime,
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleSubTask = (taskId: string, subTaskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subTasks: task.subTasks.map((st) =>
              st.id === subTaskId ? { ...st, completed: !st.completed } : st
            ),
          };
        }
        return task;
      })
    );
  };

  const toggleExpanded = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isExpanded: !task.isExpanded } : task
      )
    );
  };

  const getFilteredTasks = () => {
    let filtered =
      filter === "Pending"
        ? tasks
        : tasks.filter((task) => task.status === filter);

    if (sortByAlphabet) {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    // Sort by priority: High > Mid > Low
    const priorityOrder = { High: 0, Mid: 1, Low: 2 };
    return [...filtered].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  return {
    tasks: getFilteredTasks(),
    allTasks: tasks,
    filter,
    setFilter,
    sortByAlphabet,
    setSortByAlphabet,
    addTask,
    updateTask,
    deleteTask,
    toggleSubTask,
    toggleExpanded,
  };
}
