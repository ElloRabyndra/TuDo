export type Priority = 'High' | 'Mid' | 'Low';
export type Status = 'Pending' | 'On going' | 'Done';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  label: string;
  status: Status;
  subTasks: SubTask[];
  deadlineDate?: string;
  deadlineTime?: string;
  createdAt: string;
  isExpanded?: boolean;
}

export interface TaskFormData {
  title: string;
  priority: Priority;
  label: string;
  subTasks: string[];
  deadlineDate?: string;
  deadlineTime?: string;
}