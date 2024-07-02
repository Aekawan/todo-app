import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../types/task';
import { getAllTodos, createTodo, updateTodo, deleteTodo, getTodo } from '../services/api';

export interface TaskContextProps {
  tasks: Task[];
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  fetchTasks: () => void;
  findTask: (id: string) => void;
  addTask: ({
    title,
    description,
    icon,
    date,
    time,
  }: {
    title: string;
    description: string;
    icon: string;
    date: string;
    time: string;
  
  }) => void;
  editTask: ({
    _id,
    title,
    description,
    icon,
    date,
    time,
  }: {
    _id: string;
    title: string;
    description: string;
    icon: string;
    date: string;
    time: string; 
  }) => void;
  removeTask: (_id: string) => void;
}

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children, initialTasks }: {
  children: React.ReactNode;
  initialTasks: Task[];
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [task , setTask] = useState<Task>({ id: '', title: '', description: '', icon: '', date: '', time: '', userId: '' });

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getAllTodos();
      const sortedTasks = fetchedTasks.sort((a: Task, b: Task) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      setTasks(sortedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const findTask = async (id: string) => {
    try {
      const task = await getTodo(id);
      setTask(task)
    } catch (error) {
      console.error('Failed to fetch task:', error);
    }
  }

  const addTask = async ({
    title,
    description,
    icon,
    date,
    time,
  }: {
    title: string;
    description: string;
    icon: string;
    date: string;
    time: string;
  }) => {
    try {
      await createTodo({
        title,
        description,
        icon,
        date,
        time,
      });
      fetchTasks();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const editTask = async ({
    _id,
    title,
    description,
    icon,
    date,
    time,
  }: {
    _id: string;
    title: string;
    description: string;
    icon: string;
    date: string;
    time: string;
  
  }) => {
    try {
      await updateTodo({
        _id,
        title,
        description,
        icon,
        date,
        time,
      });
      fetchTasks();
      findTask(_id);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const removeTask = async (_id: string) => {
    try {
      await deleteTodo(_id);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, task, setTask, findTask, fetchTasks, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};