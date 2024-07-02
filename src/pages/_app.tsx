import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { TaskProvider } from '../context/TaskContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Task } from "@/types/task";
import { UserProvider } from "@/context/UserContext";

interface CustomAppProps extends AppProps {
  initialTasks: Task[];
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const Layout = (Component as any).Layout || (({ children }: { children: React.ReactNode }) => <>{children}</>);
  return (
    <UserProvider>
      <TaskProvider initialTasks={pageProps.initialTasks || []}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </TaskProvider>
    </UserProvider>
  );
}
