import { TaskContext, TaskContextProps } from "@/context/TaskContext";
import { useContext } from "react";

export const useTask = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};