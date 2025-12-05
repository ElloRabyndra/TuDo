# TuDo

TuDo is a powerful and intuitive task management application designed to help you organize your daily activities efficiently. Built as a final project for our Mobile Development course, it combines a sleek React Native frontend with a robust Go backend.

## Features

- **Smart Task Management**: Create parent tasks with multiple subtasks.
- **Organization**: Categorize tasks with Labels and Priorities (High, Mid, Low).
- **Deadlines**: Set specific dates and times for your tasks. The app validates deadlines and warns you if a task is overdue.
- **Status Tracking**:
  - Filter tasks by **Pending**, **On going**, and **Done**.
  - **Auto-Status**: The app automatically updates a task's status based on its subtasks (e.g., checking a subtask moves the parent to "On going"; checking all moves it to "Done").
- **Search**: Quickly find tasks by title.
- **Detailed Views**: View task details, edit properties, and manage subtasks individually.

## Tech Stack

### Frontend
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS)
- **Navigation**: Expo Router

### Backend
- **Language**: Go (Golang)
- **Framework**: Fiber
- **Database**: SQLite with GORM

## Dedication

> "Kelar ni Mobdev"