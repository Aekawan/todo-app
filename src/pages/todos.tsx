import type { NextPage } from 'next';
import Head from 'next/head';
import ListMode from '../components/ListMode';
import { useCallback, useEffect, useState } from 'react';
import TaskDetailsModal from '@/components/TaskDetailsModal';
import TaskModal from '@/components/TaskModal';
import { requireAuth } from '../utils/auth';
import Layout from '@/components/Layouts/Layout';
import { getAllTodos } from '@/services/api';
import { useTask } from '@/hooks/useTask';
import { Task } from '@/types/task';

interface TodosPageProps {
  initialTasks: Task[];
}

const TodoPage: NextPage<TodosPageProps> = (): React.ReactElement => {
  const { tasks, task, setTask, removeTask, fetchTasks, findTask } = useTask();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleOpenDetail = async (task: Task) => {
    setTask(task);
    setIsDetailsModalOpen(true);
    await findTask(task.id);
  };

  const handleEditTask = async (task: Task) => {
    setTask(task);
    setIsTaskModalOpen(true);
    await findTask(task.id);
  };

  const handleDeleteTask = async (_id: string) => {
    await removeTask(_id);
    setIsDetailsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex p-4">
      <Head>
        <title>Todo List - Manage Your Tasks</title>
        <meta name="description" content="Manage your todos efficiently with our Todo List app. Stay organized and increase productivity with easy-to-use task management features." />
        <meta name="keywords" content="todo, task management, productivity, todos, task list, todo app" />
        <meta name="author" content="Aekkawan Klapsan" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Todo List - Manage Your Tasks" />
        <meta property="og:description" content="Manage your todos efficiently with our Todo List app. Stay organized and increase productivity with easy-to-use task management features." />
        <meta property="og:image" content="https://yourdomain.com/images/todo-app-image.jpg" />
        <meta property="og:url" content="https://yourdomain.com/todos" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Todo List - Manage Your Tasks" />
        <meta name="twitter:description" content="Manage your todos efficiently with our Todo List app. Stay organized and increase productivity with easy-to-use task management features." />
        <meta name="twitter:image" content="https://yourdomain.com/images/todo-app-image.jpg" />

        <link rel="canonical" href="https://yourdomain.com/todos" />
      </Head>

      <main className="w-full max-w-2xl m-auto">
        <ListMode
          onOpenDetail={handleOpenDetail}
          tasks={tasks}
        />
        <TaskDetailsModal
          isOpen={isDetailsModalOpen}
          onRequestClose={() => setIsDetailsModalOpen(false)}
          task={task}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
        <TaskModal
          isOpen={isTaskModalOpen}
          onFail={() => setIsTaskModalOpen(false)}
          onSuccess={() => {
            fetchTasks();
            setIsTaskModalOpen(false);
          }}
          task={task}
        />
      </main>
    </div>
  );
};

(TodoPage as any).Layout = Layout;

export const getServerSideProps = async (context: any) => {
  const authResult = requireAuth(context);

  if (authResult) {
    return authResult;
  }

  try {
    const initialTasks = await getAllTodos(context);
    const sortedTasks = initialTasks.sort((a: Task, b: Task) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    return {
      props: { initialTasks: sortedTasks },
    };
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return {
      props: { initialTasks: [] },
    };
  }
};

export default TodoPage;